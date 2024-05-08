const router = require("express").Router();
const { create, getById, update, deletebyId, getAll } = require("./service");

router.post("/create", create);
router.get("/get/:id", getById);
router.patch("/update/:id", update);
router.delete("/delete/:id", deletebyId);
router.get("/getAll", getAll);

module.exports = router;