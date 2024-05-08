const { Schema, model } = require("mongoose")

const unitOfMeasurementSchema = new Schema({
    name: {
        type: String,
        unique  : true,
        required: true
    },
    prefix: {
        type: String,
        required: true

    }
})


const UnitOfMeasurement = model("UnitOfMeasurement", unitOfMeasurementSchema)

module.exports = UnitOfMeasurement