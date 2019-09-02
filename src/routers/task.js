const express = require('express')
const authMiddleWare = require('../middleware/auth')
const Tasks = require('../models/tasks')
const User = require('../models/users')
const router = express.Router()
const hbs = require('hbs')
const getWeather = require('../client/client')
const nodefetch = require('node-fetch')
var userTasks = undefined




//login page


router.get('',(req,res)=>{
  res.render('login')
})

router.get('/tasks/test',async(req,res)=>{

  const data =  await getWeather()
  const owner = await User.findById('5d5483b7f045c12a5d5efcab')
  // res.status(200).render('index',{...data,Owner:owner.toJSON().name})
  //console.log(owner.toJSON().name)

  const owner_tasks = []
  Object.values(owner.toJSON()).forEach((task)=>{
    owner_tasks.push(task)
  })
  console.log(owner_tasks);

})
 


router.get('/tasks/json',async(req,res)=>{

  const data =  await getWeather()
  const owner = await User.findById('5d5483b7f045c12a5d5efcab')
  res.status(200).send({...data,Owner:owner.toJSON().name})
  //console.log(owner.toJSON().name)

})



router.patch('/tasks/:id',async (req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed','description']
    const isValidUpdate = updates.every((update)=>{
      return allowedUpdates.includes(update)
    })
  
    if(!isValidUpdate){
      return res.status(400).send({error:'invalid updates'})
    }
  
  try {
  
    // const task = await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

    const task = Tasks.findById(req.params.id)
    updates.forEach((update)=>{
      task[update] = req.body[update]
    })
    await task.save()

    if(!task){
      return res.status(400).send({error:'task is not found!'})
    }
    res.send(task)
  } catch (error) {
    
  }
  
  
  
  
  })
  
  
  router.delete('/tasks/:id',async (req,res)=>{
  
  try {
    
    const task = await Tasks.findByIdAndDelete(req.params.id)
  
    if(!task){
      return res.status(404).send({error:'task is not found!'})
    }
  
    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
  
  
  
  
  })
  
  
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
  
  
  router.get('/tasks/:id',authMiddleWare,async (req,res)=>{
  
    const _id = req.params.id
    
    // Tasks.findById(_id).then((task)=>{
  
    //   if(!task){
        
    //     return res.status(404).send('not found for sorry!')
        
    //   }
  
    //   res.status(202).send(task)
  
    // }).catch((e)=>{
    //   res.status(500).send(e)
    // })
  
  
  
    try {
      
      const task = await Tasks.findOne({_id , owner: req.user._id})


      if(!task){
     
        return  res.status(404).send('invalid id, Try Another one!')
  
      }
  
        res.status(201).send(task)
    } catch (e) {
      
      res.status(500).send(e)
    }
  
  })

  
  router.get('/task/exec',async(req,res)=>{

   const owner = await User.findById('5d5483b7f045c12a5d5efcab')
    await owner.populate('tasks').execPopulate()
    const Tasks = {tasks:owner.tasks}
    // console.log(req.headers);
    
    nodefetch('http://localhost:3000/task/getUserTasks')
    .then(res => res.json())
    .then(json => {
      
      userTasks = json});
      
    
      // if(!userTasks){

      //   return res.render('login')

      // }
    res.render('index',userTasks) 



  })



  router.get('/task/getUserTasks',authMiddleWare,async(req,res)=>{

    //  const owner = await User.findById('5d5483b7f045c12a5d5efcab')
    const owner  = req.user
      await owner.populate('tasks').execPopulate()
       userTasks = {tasks:owner.tasks}

      if(!owner){
        return res.render('login')
      }

       res.send(userTasks)
    })


    router.post('/task/checkTask',authMiddleWare,async(req,res)=>{
      console.log(req.body);
          const checked = req.body.checked
          const id = req.body.id
          const task = await Tasks.findById(id)
          if(!task){
            throw new Error('task not found!')
          }
          // console.log(checked,task);
          console.log(req.body);
          task.completed = Boolean(checked)
          await task.save()
          })
        


  router.post('/task/check/:id',async(req,res)=>{

    const checked = req.body.checked
    const id = req.params.id
    const task = await Tasks.findById(id)
    if(!task){
      throw new Error('task not found!')
    }
    // console.log(checked,task);
    console.log(req.body);
    task.completed = Boolean(checked)
    await task.save()
    })
  


  router.post('/task/check',async(req,res)=>{
console.log(req.body);
    const checked = req.body.checked
    const id = req.body.id
    const task = await Tasks.findById(id)
    if(!task){
      throw new Error('task not found!')
    }
    // console.log(checked,task);
    console.log(req.body);
    task.completed = Boolean(checked)
    await task.save()
    })
  





  //GET /tasks?completed=true  
  //GET /tasks?sortBy=createdAt:desc
  router.get('/tasks', authMiddleWare,async (req,res)=>{
  
   
   const sort = {}
   const match  = {}


   if(req.query.sortBy){
     
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1:1

   }

   if(req.query.completed){

    match.completed = req.query.completed === 'true'

   }
  
  try {
    
   // cosnt allTasks = await req.user.populate('tasks').execPopulate()




   //this section is for filtering the data
   
   await req.user.populate({
     path:'tasks',
     match,
     //limit is for the maximum value of the results and skip is for skipping results if there is no value it will be ignored
     options:{
       limit: parseInt(req.query.limit),
       skip: parseInt(req.query.skip),
       //this was sorted descending way if ascending it will be 1
       sort
     }
   }).execPopulate()
    res.status(200).send(req.user.tasks)
  } catch (error) {
    
  }
  
  
  
  })
  
  router.post('/tasks',authMiddleWare ,async (req,res)=>{
  
    console.log(req.body);
    //these three dots (spread oprator) will copy all the req.body properties to the new Task object
    const task = new Tasks({

      ...req.body,
      owner: req.user._id

    })
    try {
  
      await task.save()
      res.status(201).send(task)
      
    } catch (error) {
      res.status(500).send(error)
    }
  
  
  }) 
  
  
  module.exports = router