const { model, Schema } = require("mongoose")


const jobTitleSchema = new Schema({
    name: {
        type: String,
        unique : true,
        required: true,
    },
    staffLevel: {
        type: String,
        required: true,
        ref : "StaffLevel"
    }
})



const JobTitle = model("JobTitle", jobTitleSchema)

module.exports = JobTitle