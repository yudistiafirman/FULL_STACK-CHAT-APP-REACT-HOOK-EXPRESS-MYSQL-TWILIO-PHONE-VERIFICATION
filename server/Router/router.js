const { Login, Register } = require('../Controller/Auth')
const {send_code, verify_code} = require('../middleware/phoneverifcation')
const { isValid } = require('../middleware/validator')

const Router= require('express').Router()



Router.post('/login',isValid,Login)
Router.post('/sendcode',isValid,send_code)
Router.post('/register',verify_code,Register)



module.exports=Router