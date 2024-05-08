const { Router } = require("express")
const {
    createAssetCustodyRecord,
    getAllAssetCustodyRecords,
    getSingleAssetCustodyRecord,
    updateAssetCustodyRecord,
    deleteAssetCustodyRecord,
    getAssetCustodyRecordByIssuer,
} = require("./service")


const router = Router()


router.post("/create", createAssetCustodyRecord)
router.get("/getAll", getAllAssetCustodyRecords)
router.get("/get/:id", getSingleAssetCustodyRecord)
router.patch("/update/:id", updateAssetCustodyRecord)
router.delete("/delete/:id", deleteAssetCustodyRecord)
router.get('/getByIssuer', getAssetCustodyRecordByIssuer)

module.exports = router;