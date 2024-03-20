const Employee = require("./models/Employee")
const connect = require("./db/connect")

const employees = require("./employee.json")
require("dotenv").config()

const populate = async () => {
  try {
    await connect(process.env.MONGODB_URI)
    await Employee.deleteMany()
    const docs = await Employee.insertMany(employees)

    if (docs) {
      console.log(`inserted ${docs.length} records to Employee collection`)
      process.exit(0)
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

populate()
