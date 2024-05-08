const { Router } = require("express");
const {
    createStockItemReference,
    getAllStockItemReferences, 
    updateStockItemReference,
    deleteStockItemReference} = require("./service");
const { getSingleStockItemCategory } = require("../stockItemCategories/service");

const router = Router();

router.get("/getAll", getAllStockItemReferences)
router.get("/get/:id", getSingleStockItemCategory)
router.post("/create", createStockItemReference)
router.patch("/update/:id", updateStockItemReference)
router.delete("/delete/:id", deleteStockItemReference)

module.exports = router
