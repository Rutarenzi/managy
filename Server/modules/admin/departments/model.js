const { model, Schema } = require("mongoose")


const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})


const Department = model('Department', departmentSchema)


module.exports = Department
