// const fetch = require('node-fetch')

// // fetch('http://localhost:3000/tasks/test',{method: 'POST'})
// //     .then(res => res.json())
// //     .then(json => console.log(json));


// const fetchMethod = async ()=>{
//   const data =   await  fetch('http://localhost:3000/tasks/test',{method: 'POST'})
//   console.log(data.body)
// }

// fetchMethod()



const axios = require('axios')

const getWeather = async ()=>{
  // axios({
  //   method:'get',
  //   url:'https://api.darksky.net/forecast/6f0786a01a9eefc185c2dbf9c1afc27b/37.8267,-122.4233',

  // }).then((Response)=>{
  //   console.log(Response);
  // }).catch((e)=>{
  //   console.log(e);
  // })

//  url:'https://api.darksky.net/forecast/6f0786a01a9eefc185c2dbf9c1afc27b/37.8267,-122.4233',


  const data = await  axios({
      method:'get',
      url:'http://localhost:3000/tasks',
      headers: {
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDU0ODNiN2YwNDVjMTJhNWQ1ZWZjYWIiLCJpYXQiOjE1NjU4NzgxMTh9.eitp3WGdQOX-gLLJiUyfmgSnh4ulCLTR625PNpwGfrg'
      }
  
     })
     return (data.data);
}

//getWeather()

module.exports = getWeather