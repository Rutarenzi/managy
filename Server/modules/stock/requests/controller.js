const { Router } = require("express");
const {
  createStockRequest,
  getAlltockRequests,
  getStockRequestById,
  updateStockRequestById,
  deleteStockRequestById,
  approveRequest,
} = require("./service");

const router = Router();

router.post("/createRequest", createStockRequest);
router.get("/getAllRequests", getAlltockRequests);
router.get("/getSingleRequest/:id", getStockRequestById);
router.patch("/updateRequest/:id", updateStockRequestById);
router.delete("/deleteRequest/:id", deleteStockRequestById);
router.put("/approveRequest/:id", approveRequest);

module.exports = router;
