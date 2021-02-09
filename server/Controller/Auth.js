const query=require('../db/db')
const jwt=require('jsonwebtoken')



module.exports={
    
    Login:async(req,res)=>{
        try {
            const {phone,username}=req.detail

            const user_id= await query ('select id from users where phone=? and username=? ',[phone,username])
     
            if(user_id.length>0){
                const token= jwt.sign({id:user_id[0].id},process.env.SECRET_KEY)
                res.status(200).send({
                    success:true,
                    token
                })
            }else{
                res.status(404).send({
                    success:false,
                    message:'users not found'
                })
            }
        } catch (error) {
            console.log(error)
        }
      
            
    },
    Register:async(req,res)=>{
        try {
            const {username,phone}=req.verified_user

            const result=await query('insert into users set?',{username,phone})

            const token = jwt.sign({id:result.insertId},process.env.SECRET_KEY)

            res.status(200).send({
                success:true,
                token
            })
            
        } catch (error) {
            console.log(error)
            
        }
    },

    AddContacs:async(req,res)=>{
     
  
        try {
            const {dataToken}=req.dataToken
            const {phonenumber}=req.body
            console.log(phonenumber)
            

            const isPhoneExist= await query('select id from users where phone=? ',phonenumber)

            if(isPhoneExist.length!==0){

                const isPhoneAdded= await query('select contact_id from contacts where contact_id=? and user_id=?',[isPhoneExist[0].id,dataToken.id])
        
                if(isPhoneAdded.length===0){
                    await query('insert into contacts set?',[{user_id:dataToken.id,contact_id:isPhoneExist[0].id}])

                    res.status(200).send({
                        success:true,
                        message:`${phonenumber} add contact success `
                    })
        

                }else{
                    res.status(400).send({
                        success:false,
                        message:`${phonenumber} is already in your contacts list` 
                    })
                }

           
            }else{
                res.status(404).send({
                    success:false,
                    message:'users not found'
                })
            }

        } catch (error) {
            console.log(error.message)
        }
    },

    getContacs:async(req,res)=>{
            try {
                const {dataToken}=req.dataToken
                console.log(dataToken)
                const usersInContact=await query(`select id as user_id,phone,avatar,username from users where id in(select contact_id from contacts where user_id = ${dataToken.id}) `)
                const message=await query('select * from messages where senders_id=? or recepient_id =?',[dataToken.id,dataToken.id])

                res.status(200).send({
                    success:true,
                    contacts:usersInContact,
                    messages:message
                })
                    
            } catch (error) {       
                res.status(200).send({
                    success:false,
                    message:'something went wrong'
                })
            }
           


    },

 
   

        
}