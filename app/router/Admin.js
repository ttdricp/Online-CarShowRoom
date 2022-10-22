const express = require('express')
const bodyParser=require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const UserController = require('../controllers/User')
const AdminController = require('../controllers/Admin')
const router = express.Router();
router.patch('/:email',urlencodedParser, UserController.update);
router.delete('/delete/:email', UserController.destroy);
router.get('/find/:email',urlencodedParser, UserController.findOne);
router.post('/',urlencodedParser, AdminController.create);
router.post('/user',urlencodedParser, UserController.create);
router.get('/results/', urlencodedParser,UserController.findAll);
module.exports = router