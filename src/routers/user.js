const express = require('express')
const router = express.Router()
const User = require('../models/users')
const authMiddleware = require('../middleware/auth')
const bcrypt = require('bcryptjs')





router.get('/sign-up',(req,res)=>{

    res.render('sign')
    
})


  //we add the middleware to a specific route as an argument to the get method for example
  router.get('/users/me', authMiddleware ,async (req,res)=>{
  

  
  
   
  
      //const users = await User.find({})
      res.status(200).send(req.user)
      
    
  
  })


  router.post('/users/logout',authMiddleware,async (req,res)=>{

    try {
      
      
      //the token was used for sign in only, it will be deleted! return false means delete
      req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token !== req.token
      })
     
      await req.user.save()

      res.send()

    } catch (error) {
      res.status(500).send()
      
    }



  })


  router.post('/users/logoutAll',authMiddleware,async (req,res)=>{

    try {
      req.user.tokens = []
    await req.user.save()
      res.status(200).send('Logged out from all sessions!')
    } catch (error) {
      res.status(500).send()
    }
    

  })

router.post('/users/login',async (req,res)=>{

  console.log(req.body);


  try{

    //User method is for whole model but when working specific we use instance like user
  
  const user = await User.findByCredentials(req.body.email,req.body.password)
  const token = await user.generateAuthToken()

    //toJSOM is automaticly invoked here with user or you can name another method and call it with user: user.method because express is automaticly use JSON.stringfy when sending back data
  res.status(201).send({user,token})
  }
  catch(e){

res.status(400).send(e)
  }
  
})

router.post('/users', async (req,res)=>{

    const user = new User(req.body)

    console.log(req.body);

    //await has cut all this work! 
    
   // user.save().then(()=>{

   //     res.status(201).send(user)
   //   //  res.send(req.body)

   // }).catch((error)=>{

   //   res.status(400)
   //   res.send(error)

   // })


   try{

    const token = await user.generateAuthToken()
     //await user.save()
     res.status(201).send({user,token})
   }
   catch(e){
     res.status(400).send(e)
   }

})


router.patch('/users/me',authMiddleware, async(req,res)=>{

 //when updating a feild that not exist this operation will be ignored with 200 so we have to make some checks

 const updates = Object.keys(req.body)
 const allowedUpdates = ['name','age','email','password']
 const isValidUpdate = updates.every((update)=>{
   return allowedUpdates.includes(update)
 })


 if(!isValidUpdate){
   return res.status(400).send({error: 'invalid updates!'})
 }

 try {

  //  const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
   //you can replace up code with this 

  const user  = await User.findById(req.user._id)
  updates.forEach((update)=>{
    user[update] = req.body[update]
  })

  
  await user.save()


   if(!user){
   return  res.status(404).send()
   }

   res.send(user)
   
 } catch (error) {
   res.status(401).send(error)
   
 }



})


router.delete('/users/me', authMiddleware ,async (req,res)=>{

    try {
      
      //const user = await User.findByIdAndDelete(req.user._id)
     
      await req.user.remove()
  
      res.send(req.user)
  
    } catch (error) {
      res.status(500).send(error)
    }
  
  
  })



  
  
  
    // User.findById(_id).then((user)=>{
    //   if(!user){
    //     return res.status(404).send('not')
    //   }
  
    //   res.status(203).send(user)
  
    // }).catch((e)=>{
    //   res.status(500).send(e)
    // })
  
  
  
  
  
  // app.get('/tasks/:id',(req,res)=>{
  
  //   const _id = req.params.id
    
  //   User.findById(_id).then((tasks)=>{
  //     if(!tasks){
  //       return res.status(404).send('not')
  //     }
  
  //     res.status(203).send(tasks)
  
  //   }).catch((e)=>{  
  //     res.status(500).send(e)
  //   })
  
  // })
  
  

                  //this is a dynamic path
  
  
  
  

module.exports = router