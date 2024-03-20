const router = require("express").Router()

const { getAllEmployee, getEmployee } = require("../controllers/employee")

router.route("/").get(getAllEmployee)

router.route("/:id").get(getEmployee)

module.exports = router
