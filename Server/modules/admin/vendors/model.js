const { Schema, model } = require("mongoose")

const vendorSchema = new  Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false
    },
    vatNo: {
        type: Number,
        required: true
    },
    isBlackListed: {
        type: Boolean,
        required: false,
        default: false
    }
})

const Vendors = model("Vendor", vendorSchema)


module.exports = Vendors;