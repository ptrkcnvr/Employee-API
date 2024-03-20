const Employee = require("../models/Employee")

const getAllEmployee = async (req, res) => {
  const {
    name,
    department,
    gender,
    employeeStatus,
    sort,
    fields,
    salaryFilter,
  } = req.query

  const queryObject = {}

  if (name) {
    queryObject.fullName = { $regex: name, $options: "i" }
  }

  if (department) {
    queryObject.department = department
  }

  if (gender) {
    queryObject.gender = gender
  }

  if (employeeStatus) {
    queryObject.employeeStatus = employeeStatus
  }

  if (salaryFilter) {
    //operators mapping
    const operatorsMap = {
      ">=": "$gte",
      "<=": "$lte",
      "==": "$eq",
      "!=": "$ne",
      ">": "$gt",
      "<": "$lt",
    }
    const regEx = /(<|>|!=|>=|=|<|<=)\b/g

    let filters = salaryFilter.replace(
      regEx,
      (match) => `${operatorsMap[match]}-`
    )
    const [operator, value] = filters.split("-")
    queryObject.salary = { [operator]: value }
  }

  let results = Employee.find(queryObject)

  if (sort) {
    const sortString = sort.split(",").join(" ")
    results = results.sort(sortString)
  }

  if (fields) {
    const fieldString = fields.split(",").join(" ")

    results = results.select(fieldString)
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 5
  const skip = (page - 1) * limit

  results = results.skip(skip).limit(limit)

  const employee = await results

  return res.status(200).json({ nbHits: employee.length, data: employee })
}

const getEmployee = async (req, res) => {
  const { id: employeeId } = req.params

  const employee = await Employee.findOne({ _id: employeeId })

  if (!employee) {
    throw new Error(`employee with id : ${employeeId} doesn't exist`)
  }

  return res.status(200).json({ employee })
}

module.exports = {
  getAllEmployee,
  getEmployee,
}
