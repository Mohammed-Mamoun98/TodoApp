require('../db/mongoose')
const task = require('../models/tasks')

task.findByIdAndDelete('5d45fd2237b62a3c9f9b63a6').then(()=>{
    return task.countDocuments({completed: false})
}).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})