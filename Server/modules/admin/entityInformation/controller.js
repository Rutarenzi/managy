const router = require('express').Router();
const { validateJwt } = require('../../../middlewares/jwt.validator');
const { create, getById, update, deletebyId, getAll } = require('./service');

router.use('*', validateJwt);
router.get('/getAll', getAll);
router.post('/create', create);
router.get('/get/:id', getById);
router.patch('/update/:id', update);
router.delete('/delete/:id', deletebyId);

module.exports = router;