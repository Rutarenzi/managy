const { Router }   = require('express')
const {  createDepartment, getAllDepartments, getSingleDepartment, updateDepartment, deleteDepartment } = require('./service')

const router  = Router()
router.post('/create', createDepartment)
router.get('/getAll', getAllDepartments)
router.get('/get/:id',getSingleDepartment)
router.patch('/update/:id',updateDepartment)
router.delete('/delete/:id',deleteDepartment)


module.exports = router 
