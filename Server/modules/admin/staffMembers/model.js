const { model, Schema } = require("mongoose");

const staffSchema = new Schema({
  Fname: {
    type: String,
    required: true,
    minLength: [2, "Invalid name length"],
  },
  Lname: {
    type: String,
    required: true,
    minLength: [2, "Invalid name length"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email already exists"],
    minLength: [2, "email length must be at least 2 letters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [2, "Invalid name length"],
  },
  active: {
    type: Boolean,
    default: false,
  },
  jobTitle: {
    type: Schema.Types.ObjectId,
    ref: "jobTitle",
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
    in: ["MARRIED", "SINGLE", "DIVORCED", "WIDOWED"],
  },
});

const StaffMember = model("staffMember", staffSchema);

module.exports = StaffMember;
