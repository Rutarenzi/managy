const {  Router }= require("express")
const { getAllOutgoingRequests, getOutgoingRequestById, createOutgoingRequest, updateOutgoingRequestById, deleteOutgoingRequestById, getByUser } = require("./service")

const router = Router()

router.get("/getAll",getAllOutgoingRequests)
router.get('/getByUser', getByUser)
router.get("/get/:id",getOutgoingRequestById)
router.post("/create",createOutgoingRequest)
router.patch("/update/:id",updateOutgoingRequestById)
router.delete("/delete/:id",deleteOutgoingRequestById)

module.exports = router ;