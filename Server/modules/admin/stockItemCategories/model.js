const { model, Schema, Types } = require("mongoose")

const stockItemCategorySchema = new Schema({
    name  : {
        type :  String,
        unique : true,
        required : true 
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const StockItemCategory = model("StockItemCategory", stockItemCategorySchema);

module.exports = StockItemCategory
