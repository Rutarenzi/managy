const { Router } = require("express")
const {
    getAllStockItemCategories,
    createStockItemCategory,
    getSingleStockItemCategory,
    updateStockItemCategory,
    deleteStockItemCategory } = require("./service")

const router = Router()


router.get("/getAll", getAllStockItemCategories)
router.post("/create", createStockItemCategory)
router.get("/get/:id", getSingleStockItemCategory)
router.delete("/delete/:id", deleteStockItemCategory)
router.patch("/update/:id", updateStockItemCategory)


module.exports = router;
