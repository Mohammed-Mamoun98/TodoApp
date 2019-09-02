const express = require('express')
const app = express()
const path = require('path')

require('./db/mongoose.js')


const hbs = require('hbs')

const dirPath = path.join(__dirname,'../public')

const viewsDir = path.join(__dirname,'../src/views')


const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

app.set('view engine','hbs')


app.use(express.static(dirPath))


const port = process.env.PORT || 3000


//without middleware -- request -> run route handler

//with middleware -- request -> do somthing -> run route handler




// //express middleware

// app.use((req,res,next)=>{

//   if(req.method === 'GET'){
//     res.send('GET request are disabled')
//   }

//   //if you didnt call next the route never called
//   else{
//     next()
//   }

 
// })


//middleware challenge make a maitaince mood 


// app.use((req,res,next)=>{
// res.status(503).send('Under maintainance!')
// })

//to automaticly parse json come back to express as objects
app.use(express.json())

//to seprate routers we use a specific router
app.use(userRouter)
app.use(taskRouter)






app.listen(port,()=>{
    console.log('server is up!',port)
})  

// const bcrypt = require('bcryptjs')

// const myFunction = async ()=>{

//   const password  = 'Red1234!'
//   //8 rounds of hashing is perfect , between speed and security
//   const hashedPassword = await bcrypt.hash(password,8)
//   console.log(hashedPassword)

//   //compare between plain text and hashed by hashing the plain text and compare
//   const isMatch = await bcrypt.compare('Red1234!',hashedPassword)
//   console.log(isMatch)
// }








// // myFunction()

// const jwt = require('jsonwebtoken')

// const myFunction = ()=>{

//   //                                            this is a secret key
// const token = jwt.sign({_id:'55a654d6a5dada'},'thisismynewcourse')

// //jwt.verify will return a object contains the id we registerd before
// const decoded = jwt.verify(token,'thisismynewcourse')
// console.log(decoded)
// //the token is consisted of three parts seprated by dot first is headers includes what type of algorithm jwt seconde is payload or body and contains data we provided which is id third is signature to verfy the token


// }

// myFunction()





// const cat = {
//   name: 'Hal'
// }

// console.log(JSON.stringify(cat))


const Task = require('./models/tasks')
const User = require('./models/users')