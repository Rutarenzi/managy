const { Router  } = require('express')
const { createStockMovement, getAllStockMovements, updateStockMovement, deleteStockMovement, getSingleStockMovement , getStockMovementsByCreator,approveStockMovement} = require('./service')

const router = Router()

router.post('/create', createStockMovement)
router.get('/getAll', getAllStockMovements)
router.get('/get/:id', getSingleStockMovement)
router.get('/getByCreator', getStockMovementsByCreator)
router.put('/update/:id', updateStockMovement)
router.delete('/delete/:id', deleteStockMovement)
router.put('/approve/:id', approveStockMovement)



module.exports  = router ;