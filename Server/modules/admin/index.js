const { Router } = require("express")
const usersRoutes = require("./users/users.controllers")
const jobTitlesRoutes = require("./jobTitles/controller")
const staffLevelRoutes = require("./staffLevels/controller")
const staffMembersRoutes = require("./staffMembers/controller")
const unitOfMeasurementRoutes = require("./unitOfMeasurement/controller")
const vendorsRoutes = require("./vendors/controller")
const stockItemCategoriesRoutes =  require("./stockItemCategories/controller")
const stockItemReferenceRoutes =  require("./stockItemReference/controller")
const { validateJwt, checkAdmin } = require('../../middlewares');
const assetMaintenanceLevels = require('./assetMaintenanceLevels/controller')
const assetCategories = require('./assetsCategories/controller')
const assetCondition = require('./assetConditions/controller')
const assetFunctionalLocation = require('./assetFunctionalLocations/controller')
const assetServiceStatus = require('./assetServiceStatus/controller')
const assetItemReference = require('./assetItemReference/controller')
const departmentRoutes   = require('./departments/controller');
const bankBracnchesRoutes = require('./bankBranches/controller');
const identifyDocumentTypesRoutes = require('./identifyDocumentTypes/controller');
const fieldsOfStudyRoutes = require('./fieldsOfStudy/controller');
const educationLevelsRoutes = require('./educationalLevels/controller');
const banksRoutes = require('./banks/controller');
const entityInformationRoutes = require('./entityInformation/controller');
const officeLocationsRoutes = require('./officeLocations/controller')
const unitsOfMeasurement = require('./unitOfMeasurement/controller')
const router = Router()


router.use("/users", usersRoutes)
router.use("*",validateJwt, checkAdmin)
router.use("/jobTitles", jobTitlesRoutes)
router.use("/staffLevels", staffLevelRoutes)
router.use("/staffMembers", staffMembersRoutes)
router.use("/unitOfMeasurement", unitOfMeasurementRoutes)
router.use("/vendors", vendorsRoutes)
router.use("/stockItemCategories", stockItemCategoriesRoutes)
router.use("/stockItemReference", stockItemReferenceRoutes)
router.use('/departments', departmentRoutes)
router.use('/assetMaintenanceLevels',assetMaintenanceLevels)
router.use('/assetCategories', assetCategories)
router.use('/assetItemReference', assetItemReference)
router.use('/assetConditions', assetCondition)
router.use("/assetFunctionalLocations", assetFunctionalLocation);
router.use('/assetServiceStatus', assetServiceStatus)
router.use('/bankBranches', bankBracnchesRoutes)
router.use('/identifyDocumentTypes', identifyDocumentTypesRoutes)
router.use('/banks', banksRoutes);
router.use('/fieldsOfStudy', fieldsOfStudyRoutes);
router.use('/educationalLevels', educationLevelsRoutes);
router.use('/entityInformation', entityInformationRoutes);
router.use('/officeLocations', officeLocationsRoutes);
router.use('/unitsOfMeasurement', unitsOfMeasurement)


module.exports = router
