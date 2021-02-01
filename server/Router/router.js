const { Login, Register, AddContacs, getContacs } = require('../Controller/Auth')
const jwtParamsVerify = require('../middleware/jwtParams')
const {send_code, verify_code} = require('../middleware/phoneverifcation')
const { isValid } = require('../middleware/validator')

const Router= require('express').Router()



Router.post('/login',isValid,Login)
Router.post('/sendcode',isValid,send_code)
Router.post('/register',verify_code,Register)
Router.post('/addcontact/:token',jwtParamsVerify,AddContacs)
Router.get('/getallcontacts/:token',jwtParamsVerify,getContacs)



module.exports=Router