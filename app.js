require("dotenv").config({})
require("express-async-errors")
const express = require("express")

const employeeRoutes = require("./routes/employee")

//db
const connect = require("./db/connect")

const app = express()

//middlewares
app.use(express.json())

//routes
app.use("/api/v1/employee", employeeRoutes)

const PORT = process.env.PORT || 8000

const start = async () => {
  try {
    await connect(process.env.MONGODB_URI)
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
