const  { Router } = require('express');
const { create, getById, updateById, deletebyId, getAll } = require('./service');
const { checkAdmin, validateJwt } = require('../../../middlewares');

const router  = Router();

router.post('/create' , validateJwt, checkAdmin, create);
router.get('/get/:id' , validateJwt, getById);
router.get('/getAll' ,validateJwt, getAll);
router.patch('/update/:id', validateJwt, checkAdmin, updateById);
router.delete('/delete/:id' , validateJwt, checkAdmin,  deletebyId);

module.exports = router
