const jwt = require('jsonwebtoken')

const jwtParamsVerify = (req, res, next) => {
    const {token} = req.params
 
  

    jwt.verify(token, process.env.SECRET_KEY, (err, dataToken) => {
        try {
            if(err) throw err
            
            req.dataToken = {dataToken}
            next()
        } catch (error) {
               res.status(400).send({
                   success:false,
                   message:error.message
               })
       
        }
    })
}   

module.exports = jwtParamsVerify