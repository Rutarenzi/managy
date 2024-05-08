const { Router  }   = require("express")
const { getAllReceivableNotes, getReceivableNotesById, createReceivableNotes, updateReceivableNotesById, deleteReceivableNotesById, getReceivableNotesByCreator } = require("./service")

const router =  Router()

router.get("/getAll", getAllReceivableNotes)
router.get("/getSingle/:id", getReceivableNotesById)
router.get('/getByCreator', getReceivableNotesByCreator)
router.post("/create", createReceivableNotes)
router.patch("/update/:id", updateReceivableNotesById)
router.delete("/delete/:id", deleteReceivableNotesById)

module.exports = router ;
