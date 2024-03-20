const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
  firstName: {
    required: [true, "firstName is a required field"],
    type: String,
    max: [20, "firstname cannot be more than 20 characters long"],
    min: [3, "firstname must be more than 3 characters"],
  },
  lastName: {
    required: [true, "lastName is a required field"],
    type: String,
    max: [20, "lastName cannot be more than 20 characters long"],
    min: [3, "lastName must be more than 3 characters"],
  },
  fullName: {
    type: String,
    default: function () {
      return this.firstName + " " + this.lastName
    },
  },
  gender: {
    type: String,
    enum: {
      values: ["M", "F"],
      message: "value should be M or F",
    },
    default: "Prefer Not to State",
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "email must be provided"],
  },
  department: {
    type: String,
    enum: {
      values: ["IT", "HR", "Sales"],
      message: "value should be a valid department",
    },
  },
  employeeStatus: {
    type: Boolean,
    default: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = new mongoose.model("Employee", employeeSchema)
