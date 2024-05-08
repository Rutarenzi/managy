const { Router } = require("express")
const incomingStockReqsRoutes = require("./incoming/controller")
const receivableNotesRoutes = require("./receivableNotes/controller")
const stockRequestRoutes = require("./requests/controller")
const outgoingRequestsRoutes = require("./outgoing/controller")
const stockMovementsRoutes = require("./movements/controller")
const openingStockRoutes =  require('./opening/controller')
const { validateJwt } = require("../../middlewares/jwt.validator")
const router = Router()

router.use("*", validateJwt)
router.use("/incomingRequests", incomingStockReqsRoutes)
router.use("/outgoingRequests", outgoingRequestsRoutes)
router.use("/receivableNotes", receivableNotesRoutes)
router.use("/stockRequest", stockRequestRoutes)
router.use("/stockMovements", stockMovementsRoutes)
router.use('/openingStock',openingStockRoutes)

module.exports = router;