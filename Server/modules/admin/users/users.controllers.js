const { Router } = require("express");
const { createNewUser, loginUser, getAllUsers, updateUser, deleteUser } = require("./users.service");
const { validateJwt } = require("../../../middlewares/jwt.validator");
const { checkAdmin } = require("../../../middlewares/checkadmin.middleware");

const router = Router();

router.post("/login", loginUser);
router.use('*',validateJwt,checkAdmin)
router.post("/create", createNewUser);
router.get("/getAll", validateJwt, checkAdmin, getAllUsers);
router.patch('/update/:id', validateJwt, checkAdmin, updateUser);
router.delete('/delete/:id', validateJwt, checkAdmin, deleteUser);

module.exports = router;
