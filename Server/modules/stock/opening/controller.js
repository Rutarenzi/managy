const { Router } = require('express');
const {
  createOpenStock,
  getAllOpenStocks,
  getOpenStockById,
  updateOpenStockById,
  deleteOpenStockById,
} = require('./service');
const router = Router();


router.post('/create', createOpenStock);
router.get('/getAll', getAllOpenStocks);
router.get('/get/:id', getOpenStockById);
router.patch('/update/:id', updateOpenStockById);
router.delete('/delete/:id', deleteOpenStockById);

module.exports = router;
