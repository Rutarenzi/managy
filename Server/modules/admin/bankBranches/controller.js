const router = require("express").Router();
const { create, getById, update, deletebyId, getAll } = require("./service");

router.post("/create", create);
router.get("/getAll", getAll);
router.get("/get/:id", getById);
router.patch("/update/:id", update);
router.delete("/delete/:id", deletebyId);

module.exports = router;