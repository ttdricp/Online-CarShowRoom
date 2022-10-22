const Router = require('express')
const bodyParser=require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = new Router()
const controller = require('../controllers/regController')
const authMiddleware = require("../middlewares/authenticateUser")
const {check} = require("express-validator")

router.post('/registration',[
    check('name',"Name can't be empty").notEmpty(),
    check('password',"The password must be > 4 and < 10 symbols").isLength({min:4, max:10})
], controller.registration)


router.post('/adminRegistration',[
    check('name',"Name can't be empty").notEmpty(),
    check('password',"The password must be > 4 and < 10 symbols").isLength({min:4, max:10})
], controller.adminRegistration)


router.post('/adminLogin',controller.adminLogin)
router.get('/admins', authMiddleware, controller.getAdmins)


router.post('/login',controller.login)
router.get('/users', authMiddleware, controller.getUsers)



module.exports = router
