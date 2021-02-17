const express = require('express')
const cors =require('cors')
const morgan=require('morgan')
const port = 4000
const AuthRoute=require('./Router/router')
const app = express()



app.use(cors())
app.use(express.json())



app.use('/auth',morgan('dev'),AuthRoute)
app.use(express.static('public'))


app.listen(port,()=>{
    console.log('app is running in '+port)
})

