const jwt =require('jsonwebtoken')
const User = require('../models/users')


const auth = async (req,res,next)=>{

    try {
        
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded  = jwt.verify(token,'thisismynewcourse')
       const user = await User.findOne({_id: decoded._id,'tokens.token':token})
        //console.log(user)
        if(!user){
            throw new Error('user not found')
        }

        //we are adding the user and token to the request
        req.token = token   
       req.user = user
      
        next()
    } catch (error) {
        
        res.status(401).send({error:'please Authenticate'})
    }
   
}
 
module.exports = auth