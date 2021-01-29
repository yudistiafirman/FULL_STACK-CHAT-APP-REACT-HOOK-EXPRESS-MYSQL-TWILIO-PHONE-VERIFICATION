const { ValidatePhone,ValidateUsername } = require("../Helpers/valid")


module.exports={
    isValid:(req,res,next)=>{
        try {
            const {username,phone}=req.body
            console.log(username,phone)
            if(!ValidatePhone(phone))throw 'wrong format phone'
            if(ValidateUsername(username)) throw 'name too short'

            req.detail={username,phone}

            next()
        } catch (error) {
            res.status(406).send({
                success:false,
                error:error
            })
        }
    }
}

