const { Router } = require("express")
const {
    createAssetMaintenanceRequest,
    getAllAssetMaintenanceRequests,
    getSingleAssetMaintenanceRequest,
    updateAssetMaintenanceRequest,
    deleteAssetMaintenanceRequest,
} = require("./service")


const router = Router()


router.post("/create", createAssetMaintenanceRequest)
router.get("/getAll", getAllAssetMaintenanceRequests)
router.get("/get/:id", getSingleAssetMaintenanceRequest)
router.patch("/update/:id", updateAssetMaintenanceRequest)
router.delete("/delete/:id", deleteAssetMaintenanceRequest)

module.exports = router;