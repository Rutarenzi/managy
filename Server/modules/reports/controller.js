const { assetReport, stockReport } = require("./service")

const router = require("express").Router()

router.get('/asset/:startDate/:endDate', assetReport)
router.get('/stock/:startDate/:endDate', stockReport)

module.exports = router