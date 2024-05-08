const { Router } = require("express")
const { createStaffMember, getStaffMember, deleteStaffMember, updateStaffMember, getAllStaffMembers } = require("./service")

const router = Router()


router.get("/getAll", getAllStaffMembers )
router.post("/create", createStaffMember)
router.get("/get/:id", getStaffMember)
router.delete("/delete/:id",deleteStaffMember)
router.patch("/update/:id", updateStaffMember)


module.exports = router;
