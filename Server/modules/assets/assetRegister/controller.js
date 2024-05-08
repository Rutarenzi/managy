const  { Router } = require('express');
const { create, getById, updateById, deletebyId, getAll, getByCreator } = require('./service');
const {validateJwt } = require('../../../middlewares');

const router  = Router();


router.post('/create' , validateJwt, create);
router.get('/get/:id' , validateJwt, getById);
router.get('/getAll' ,validateJwt, getAll);
router.get('/getByCreator' ,validateJwt, getByCreator);
router.patch('/update/:id', validateJwt, updateById);
router.delete('/delete/:id' , validateJwt,  deletebyId);

module.exports = router
