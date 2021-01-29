const query = require('../db/db')
const jwt = require('jsonwebtoken')
const client = require('twilio')(process.env.ACCOUNT_ID,process.env.VERIFY_TOKEN)




module.exports={
    send_code:async (req,res)=>{
            try {
                const {phone,username}=req.detail

                const user_id= await query('select id from users where phone =?',phone)
                console.log(user_id.length)
                if(user_id.length!==0){

                const token = jwt.sign({id:user_id[0].id},process.env.SECRET_KEY)
                res.send({
                
                success:true,
                token

                })

                }else{
                
                    const verification= await client.verify.services(process.env.SERVICE_ID)
                    .verifications
                    .create({to:phone.toString(),channel:'sms'})
                     if(verification.status==="pending"){
            
                  
                    res.status(200).send({
                        success:true,
                        message:`Please enter 4 digit verifation code that we've sent to number  xxxxxxxxxxxx${phone.slice(10,phone.length)}`
                    })
                     }else{
                    res.status(400).send({
                        success:false,
                        message:'something went wrong'
                    })
                }


                }

            } catch (error) {
                    res.status(400).send({
                        success:false,
                        message:`${error.message}`
                    })
            }
    },
    verify_code:async(req,res,next)=>{
        try {
            const {phone,username,code}=req.body
        
            const verified= await client.verify.services(process.env.SERVICE_ID)
            .verificationChecks
            .create({to:phone.toString(),code:code.toString()})
    
    
            if(verified.valid===false){
            res.status(400).send({
             success:false,
            message:'wrong code please try again'
            })
            }else{
    
    
            req.verified_user={username,phone}
            next()
    
            }
        } catch (error) {
            res.status(400).send({
                max_attempt:true,
               message:error.message
               })
        }
 
    }
    }
                



           
        
