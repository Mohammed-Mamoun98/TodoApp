const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true,
    },
    age:  {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0){
                throw new Error('you must provid a positive age!')
            }
        }
    },
    email : {
        type:String,
        required: true,
        //no more than one user have the same email
        unique:true,
        trim:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){

                throw new Error('not a valid Email!')
            }
        }

    },
    password: {
        required: true,
        type: String,
        trim: true,
        minlength: 6,
        validate(value){

           
             if(value.includes('password')){

                throw new Error('not permitted password!')
            }
           
            
        }
    },
    
    tokens:[{
        token:{
            type:String, 
            required:true
        }
    }],


    
},{
    timestamps: true
})


 
userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})



   

//this is not a really stored data but for the reference goal



// userSchema.virtual('tasks',{
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })

//for a specific user we use -- methods
userSchema.methods.generateAuthToken = async function(){

    const user = this 
    const token =  jwt.sign({_id:user._id.toString()},'thisismynewcourse')
    //concat is for adding new token tokens array
     user.tokens = user.tokens.concat({token})
    await user.save()

    return token

}


userSchema.methods.toJSON =  function(){
    const user = this 
    const userObject = user.toObject()


    delete userObject.password
    delete userObject.tokens


    return userObject

}
//statics is a model methods-- for all users
userSchema.statics.findByCredentials = async (email,password)=>{

    const user = await User.findOne({email})

    if(!user){
        throw new Error('unable to login')
    }
 
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('unable to login')
    }

    return user


}





//userSchema. middleware methods, pre before event like saving and post after event
//we need a standard function, arrow function cant bind it and we call save to not continue running forever and we can access this
userSchema.pre('save', async function (save){

    const user = this 

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    save()

})


const User = mongoose.model('User',userSchema)

module.exports = User