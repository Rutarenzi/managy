const { Router } = require("express")
const { createUnitOfMeasurement, getAllunitOfMeasurement, deleteUnitOfMeasurement, getSingleUnitOfMeasurement, updateUnitOfMeasurement } = require("./service")

const router = Router()

router.post("/create", createUnitOfMeasurement)
router.get("/getAll", getAllunitOfMeasurement)
router.delete("/delete/:id", deleteUnitOfMeasurement)
router.get("/get/:id", getSingleUnitOfMeasurement)
router.patch("/update/:id", updateUnitOfMeasurement)



module.exports = router
