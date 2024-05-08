const { Router } = require('express')
const { create, getAll, getById, update, delete: _delete } = require('./service')

const router = Router();

router.post('/create', create)
router.get('/getAll', getAll)
router.get('/get/:id', getById)
router.patch('/update/:id', update)
router.delete('/delete/:id', _delete);

module.exports = router