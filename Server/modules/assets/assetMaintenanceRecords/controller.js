const { Router } = require("express")
const {
    createAssetMaintenanceRecord,
    getAllAssetMaintenanceRecords,
    getSingleAssetMaintenanceRecord,
    updateAssetMaintenanceRecord,
    deleteAssetMaintenanceRecord,
    getAllAssetMaintenanceRecordsByCreator,
} = require("./service")


const router = Router()


router.post("/create", createAssetMaintenanceRecord)
router.get("/getAll", getAllAssetMaintenanceRecords)
router.get("/getByCreator", getAllAssetMaintenanceRecordsByCreator)
router.get("/get/:id", getSingleAssetMaintenanceRecord)
router.patch("/update/:id", updateAssetMaintenanceRecord)
router.delete("/delete/:id", deleteAssetMaintenanceRecord)

module.exports = router;