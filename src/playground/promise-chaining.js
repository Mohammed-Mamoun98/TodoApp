require('../db/mongoose')
const User = require('../models/users')
const Task = require('../models/tasks')

// User.findByIdAndUpdate('5d46bed19f660478b66ace5e', {age :1}).then((user)=>{

//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async (id,age)=>{

    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return {count,user}

}

updateAgeAndCount('5d46bed19f660478b66ace5e',5).then((count)=>{
    console.log(count.count)
}).catch((e)=>{
    console.log(e)
})

deleteTaskAndCount = async (id)=>{
    const deletedTask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})

    return {deletedTask,count}
}


deleteTaskAndCount('5d45fcfd7397d83c75144daf').then((deleteObject)=>{
    console.log('Deleted Task',deleteObject.deletedTask)
    console.log('count',deleteObject.count)

})