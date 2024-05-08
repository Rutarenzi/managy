const { Router } = require("express")

const { validateJwt, checkAdmin } = require('../../middlewares');
// const assetAuditingRecordsRoutes = require('./assetAuditingRecords/controller')
const assetCustodyRecordsRoutes = require('./assetCustodyRecords/controller')
const assetMaintenanceRecordsRoutes = require('./assetMaintenanceRecords/controller')
const assetMainenanceRequestsRoutes = require('./assetMaintenanceRequests/controller')
const assetMovementRoutes = require('./assetMovement/controller')
const assetRegisterRoutes = require('./assetRegister/controller')
const router = Router()


router.use("*", validateJwt, checkAdmin)
// router.use('/assetAuditingRecords', assetAuditingRecordsRoutes)
router.use('/assetCustodyRecords', assetCustodyRecordsRoutes)
router.use('/assetMaintenanceRecords', assetMaintenanceRecordsRoutes)
router.use('/assetMaintenanceRequests', assetMainenanceRequestsRoutes)
router.use('/assetMovement', assetMovementRoutes)
router.use('/assetRegister', assetRegisterRoutes)


module.exports = router