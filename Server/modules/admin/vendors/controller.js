const { Router } = require("express")
const {
    createNewVendor,
    getAllVendors,
    getSingleVendor,
    updateVendor,
    deleteVendor } = require("./service")

const router = Router()



router.post("/create", createNewVendor)
router.get("/getAll", getAllVendors)
router.get("/get/:id", getSingleVendor)
router.patch("/update/:id", updateVendor)
router.delete("/delete/:id", deleteVendor)


module.exports = router;
