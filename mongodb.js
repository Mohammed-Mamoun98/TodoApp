//CRUD Create Read Update Delete


//there is two ways:

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient


//we just destucture the mongodb object
const {MongoClient,ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const id = new ObjectID()

// //view the 12 bytes objectID
// console.log(id)

// //view when the object was created
// console.log(id.getTimestamp())

// //view the raw data of the object
// console.log(id.id)

// //view the length
// console.log(id.id.length)

// console.log(id.toHexString().length)


MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{

    if(error){
        return console.log('cant connect to database!')

    }
   // console.log('connect')

    //give a reference name to the database
    const db = client.db(databaseName)

    //Quering data from database
    //find one fetch only one document

    // db.collection('users').findOne({ _id: new ObjectID("5d40074e73eb5f531564162a") },(error,result)=>{

    //         if(error){
    //             return console.log('Unable to fetch data!')
    //         }

    //         console.log(result)
    // })


    
    // db.collection('users').find({age: 27}).toArray((error,result)=>{

    //     console.log(result)
    // })


    //challenge

    // db.collection('Tasks').findOne({_id :  new ObjectID("5d4010539b623060bcadafa9")},(error , result)=>{

    //     if(error){
    //         return console.log('unable to fetch data!')
    //     }

    //     console.log(result)
    // })
   

    // db.collection('Tasks').find({completed: false}).toArray((error,result)=>{
        
    //     if(error){
    //         return console.log('unable to fetch data!')
    //     }
    //     console.log(result)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5d40a0c8ca94f23321102779')
    // },
    // {
    //     //$set and $inc are a update oprator
    //     $inc: {
    //         age: 3
    //     }
    // }).then((result)=>{

    //     console.log(result)

    // }).catch((error)=>{

    //     console.log('error')

    // })


    // db.collection('Tasks').updateMany(
    //     {
    //         completed:false
    //     },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }
    // ).then((result)=>{

    //     console.log(result.modifiedCount)
    // }).catch((error)=>{
    //     console.log('Error!')
    // })


    db.collection('users').deleteMany({
        name:'ganther'
    }).then((result)=>{

        console.log(result)
    }).catch((error)=>{

    })


    db.collection('Tasks').deleteMany(
        {
            description:'Django'
        }
    ).then((result)=>{
        console.log(result.deletedCount)
    }).catch((error)=>{

    })





    //To insert a single record *

    // db.collection('users').insertOne({
    //     _id: id,
    //     name:'Andrew',
    //     age: 27

    // },(error,result)=>{

    //     if(error){
    //         return console.log('cant add the data!')
    //     }

    //     console.log(result.ops)

    // })

    //To insert many records (Array of Objects) *

    // db.collection('users').insertMany(
    //     [
    //         {
    //             name:'jen',
    //             age:26
    //         },
    //         {
    //             name:'ganther',
    //             age: 27
    //         }
    //     ],(error,result)=>{
    //         if(error){
    //             return console.log('cant insert data to users db!')
    //         }

    //         console.log(result.ops)
    //     }
    // )


    // db.collection('Tasks').insertMany(
    //     [
    //         {
    //             description:'Nodejs',
    //             completed:true
    //         },
    //         {
    //             description:'Django',
    //             completed: false
    //         },
    //         {
    //             description:'ASP.net',
    //             completed:false
    //         }

    //     ]
    // ,(error,result)=>{
    //     if(error){
    //         return console.log('cant add data to task database!')
    //     }

    //     console.log(result.ops)
    // })







})

