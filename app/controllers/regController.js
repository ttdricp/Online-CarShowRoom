const Admin = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const  {validationResult} = require('express-validator')
const  {secret} = require("../config")
const {sign} = require("jsonwebtoken")


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload,
        secret,
        {expiresIn: "24h"})
}

class regController {

    async adminRegistration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Enrollment error", errors})
            }
            const {email, name, password, re_pass} = req.body
            console.log(email, name, password, re_pass)

            if (!email && !name && !password && !re_pass) return res.send("Please enter all the fields");

            const candidate = await Admin.findOne({email})
            if (candidate) {
                return res.status(400).json({message: "An Admin with the same email already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const adminRole = await Role.findOne({value: "ADMIN"})
            const admin = new Admin({email, name, password: hashPassword, re_pass: hashPassword, roles: [adminRole.value]})
            await admin.save()
            return res.json({message: "Admin successfully registered"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async adminLogin(req, res) {
        try {
            const {email: name, password} = req.body
            const admin = await Admin.findOne({email: name})
            if (!admin) {
                return res.status(400).json({message: "Admin " + name + " is not found"})

            }
            const validPassword = bcrypt.compareSync(password, admin.password)

            if (!validPassword) {
                return res.status(400).json({message: 'Entered wrong password'})
            }
            const token = generateAccessToken(admin._id, admin.roles)
            return res.json({token})


        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
    async getAdmins(req, res) {
        try {
            const admins = await Admin.find()
            res.json(admins)
        } catch (e) {
            console.log(e)
        }
    }

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Enrollment error", errors})
            }
            const {email, name, password, re_pass} = req.body
            console.log(email, name, password, re_pass)

            if (!email && !name && !password && !re_pass) return res.send("Please enter all the fields");

            const candidate = await Admin.findOne({email})
            if (candidate) {
                return res.status(400).json({message: "a user with the same email already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new Admin({email, name, password: hashPassword, re_pass: hashPassword,roles: [userRole.value]})
            await user.save()
            return res.json({message: "User successfully registered"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }


    async login(req, res) {
        try {
            const {email: name, password} = req.body
            const user = await Admin.findOne({email: name})
            if (!user) {
                return res.status(400).json({message: "User " + name + " is not found"})

            }
            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) {
                return res.status(400).json({message: 'Entered wrong password'})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})


        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
    async getUsers(req, res) {
        try {
            const users = await Admin.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}


module.exports = new regController()