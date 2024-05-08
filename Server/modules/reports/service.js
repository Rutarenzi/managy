const Department = require("../admin/departments/model");
const StockItemCategory = require("../admin/stockItemCategories/model");
const StockItemReference = require("../admin/stockItemReference/model");
const UnitOfMeasurement = require("../admin/unitOfMeasurement/model");
const { Asset } = require("../assets/assetRegister/model");
const IncomingRequest = require("../stock/incoming/model");
const OpeningStock = require("../stock/opening/model");
const StockRequest = require("../stock/requests/model");
// const { assetReportSchema } = require("./schema")

module.exports.assetReport = async (req, res) => {

    try {
        // const { value, err } = assetReportSchema.validate(req.body)
        // if (err) throw new Error(err.message)

        /**
         * Filter report according to time created {startTime and endTime}
         * Filter by Department
         * Filter by functional location
         * filter by asset Category
         * fitler by asset item
         */
        const startDate = new Date(req.params.startDate)
        const endDate = new Date(req.params.endDate)

        const result = await Asset.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: "$department",
                    assets: { $push: "$$ROOT" }
                }
            },
            {
                $addFields: {
                    "assets": {
                        $map: {
                            input: "$assets",
                            as: "asset",
                            in: {
                                $mergeObjects: [
                                    "$$asset",
                                    {
                                        "netBookValue": {
                                            $multiply: [
                                                {
                                                    $divide: [
                                                        { $subtract: [100, "$$asset.depreciationRate"] },
                                                        100
                                                    ]
                                                },
                                                "$$asset.acquisitionValue"
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        ]).exec();



        return res.status(200).json({ status: true, data: result })

    } catch (err) {
        console.log(err)
        return res.status(406).json({ status: false, error: err.message })
    }
}

module.exports.stockReport = async (req, res) => {
    try {

        //Stock report
        /**
         * Grouped by categories
         * Opening stock(), Received(stock incoming), Issued(approved stock request), Closing stock(remaining in the stock)    [qty, value, value] ==> total on the bottom
         * Grand totals of all categories
         */

        // const itemRefs = await StockItemReference.find().populate("unitOfMeasurement").populate("stockItemCategory").exec()
        // const itemCategories = await StockItemCategory.find()



        const today = new Date(); // get today's date
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1); // subtract 1 from the current month
        const lastMonthYear = lastMonth.getFullYear();
        const lastMonthMonth = lastMonth.getMonth() + 1; // add 1 to the month to convert it to human-readable format
        const lastMonthDate = new Date(lastMonthYear, lastMonthMonth, 0).getDate(); // get the last day of the previous month
        const lastMonthDateString = `${lastMonthYear}-${lastMonthMonth}-${lastMonthDate}`; // format the date as a string

        const startDate = new Date(req.params.startDate) ?? new Date(lastMonthDateString)
        const endDate = new Date(req.params.endDate) ?? new Date(Date.now())

        const itemRefs = await StockItemReference.find()
            .populate("unitOfMeasurement")
            .populate("stockItemCategory")
            .exec();

        // Create an empty object to store the grouped items
        const itemsByCategory = {};

        // Loop through each item reference and group it by its category
        itemRefs.forEach((item) => {
            const categoryName = item.stockItemCategory.name;
            if (!itemsByCategory[categoryName]) {
                itemsByCategory[categoryName] = [];
            }

            // Initialize the item with opening, received, issued, and closing properties
            const opening = {
                qty: 0,
                unitPrice: 0,
                value: 0
            };

            const received = {
                qty: 0,
                unitPrice: 0,
                value: 0
            };

            const issued = {
                qty: 0,
                unitPrice: 0,
                value: 0
            };

            const closing = {
                qty: 0,
                unitPrice: 0,
                value: 0
            };

            itemsByCategory[categoryName].push({
                ...item._doc,
                opening,
                received,
                issued,
                closing
            });
        });

        // Convert the object to an array of category objects

        // Get the opening stock
        const openingStock = await OpeningStock.find({date: {$gte: startDate, $lte: endDate}}).populate("item")
        const receivedStock = await IncomingRequest.find({ createdAt: { $gte: startDate, $lte: endDate } }).populate("item").populate("unitOfMeasurement").populate({ path: "item.stockItemCategory", model: "StockItemCategory" })
        const issuedStock = await StockRequest.find({ isApproved: true, createdAt: { $gte: startDate, $lte: endDate }}).populate("item")

        const itemCategories = Object.entries(itemsByCategory).map(([categoryName, items]) => ({
            category: categoryName,
            openingTotal: 0,
            receivedTotal: 0,
            issuedTotal: 0,
            closingTotal: 0,
            items,
        }));


        itemCategories.forEach((category)=>{
            category.items.forEach((item)=>{
                const itemId = item._id
                openingStock.forEach((stock)=>{
                    if(stock.item._id == itemId.toString()){
                        item.opening.qty += stock.quantity
                        item.opening.unitPrice = stock.unitPrice
                        item.opening.value = stock.total
                        category.openingTotal += stock.total
                    }
                })

                receivedStock.forEach((stock)=>{
                    if(stock.item._id == itemId.toString()){
                        item.received.qty += stock.quantity
                        item.received.unitPrice = stock.unitPrice
                        item.received.value = stock.total
                        category.receivedTotal += stock.total
                    }
                })

                issuedStock.forEach((stock)=>{
                    if(stock.item._id == itemId.toString()){
                        item.issued.qty += stock.quantity
                        item.issued.unitPrice = stock.unitPrice
                        item.issued.value = stock.total
                        category.issuedTotal += stock.total
                    }
                })

                item.closing.qty = item.opening.qty + item.received.qty - item.issued.qty
                item.closing.unitPrice = item.opening.unitPrice
                item.closing.value = item.opening.value + item.received.value - item.issued.value
                category.closingTotal += item.closing.value

            })


        })



        return res.json({ status: true, data: itemCategories });

    } catch (error) {
        console.log(error)
        return res.status(406).json({ status: false, error: error.message })
    }
}