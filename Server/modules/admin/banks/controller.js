const {  Router } = require('express')
const { create , getAll, getById ,update ,deletebyId}  =  require('./service');

const router = Router()


router.post('/create', create)
router.get('/getAll', getAll)
router.get('get/:id', getById)
router.patch('/update/:id', update)
router.delete('/delete/:id', deletebyId)


module.exports = router ;
