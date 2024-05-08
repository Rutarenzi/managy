const { Router } = require("express")
const { getAllIncomingRequests, getIncomingRequestById, createIncomingRequest, updateIncomingRequestById, deleteIncomingRequestById, getIncomingRequestsByCreator } = require("./service")

const router = Router()

router.get("/getAll", getAllIncomingRequests)
router.get("/get/:id", getIncomingRequestById)
router.post("/create", createIncomingRequest)
router.patch("/update/:id", updateIncomingRequestById)
router.delete("/delete/:id", deleteIncomingRequestById)
router.get('/getByCreator', getIncomingRequestsByCreator)

module.exports = router;