const vendorSchema = require("./schema")
const Vendor = require("./model")

module.exports.createNewVendor = async (req, res) => {
    try {

        const { value, error } = vendorSchema.validate(req.body)
        if (error) throw new Error(error.message)

        const newVendor = new Vendor({
            name: value.name,
            address: value.address,
            email: value.email,
            website: value.website,
            vatNo: value.vatNo,
            isBlackListed: value.isBlackListed
        })

        const savedVendor = await newVendor.save();
        return res.status(200).json({ success: true, message: "Vendor added successfully", data: savedVendor })

    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}
module.exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find()
        return res.status(200).json({ success: true, message: "All vendors", data: vendors })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}

module.exports.getSingleVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id)
        if (!vendor) throw new Error("Vendor not found")
        return res.status(200).json({ success: true, message: "Vendor found", data: vendor })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}

module.exports.updateVendor = async (req, res) => {
    try {
        const { value, error } = vendorSchema.validate(req.body)
        if (error) throw new Error(error.message)
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, value, { new: true })
        if (!vendor) throw new Error("Vendor not found")
        return res.status(200).json({ success: true, message: "Vendor updated successfully", data: vendor })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}

module.exports.deleteVendor = async (req, res) => {
    try {
        const { id }   = req.params
        if(!id) throw new Error("Vendor id not found")
        const vendor = await Vendor.findByIdAndDelete(id)
        if (!vendor) throw new Error("Vendor not found")
        return res.status(200).json({ success: true, message: "Vendor deleted successfully", data: vendor })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}
