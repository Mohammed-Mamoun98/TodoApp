const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,   //deprecation warning!
})


//trim is to get rid of the spaces in the String and lowercase to convert to lowercase before saving 

// const User = mongoose.model('User',{

//     name:{
//         type: String,
//         required: true,
//         trim: true,
//     },
//     age:  {
//         type: Number,
//         default: 0,
//         validate(value){
//             if (value < 0){
//                 throw new Error('you must provid a positive age!')
//             }
//         }
//     },
//     email : {
//         type:String,
//         required: true,
//         trim:true,
//         lowercase: true,
//         validate(value){
//             if(!validator.isEmail(value)){

//                 throw new Error('not a valid Email!')
//             }
//         }

//     },
//     password: {
//         required: true,
//         type: String,
//         trim: true,
//         minlength: 6,
//         validate(value){

           
//              if(value.includes('password')){

//                 throw new Error('not permitted password!')
//             }
           
            
//         }
//     } 
// })

// const me = new User({
//     name:'   Mike T   ',
    
//     email:'hello@gmail.Com',
//     password: 'paord'
// })

// me.save().then(()=>{

// console.log(me)
// }).catch((error)=>{

//     console.log('Error!',error)
// })

// const Tasks = mongoose.model('Tasks',{
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     }
//     ,
//     completed:{
//         type:Boolean,
//         required: false,
//         default: false
//     }
// })

// const new_Task = new Tasks({
//     description:'  NodeJs  ',
    
// })

// new_Task.save().then(()=>{
//     console.log(new_Task)
// }).catch((error)=>{
//     console.log('Error!',error)
// })
