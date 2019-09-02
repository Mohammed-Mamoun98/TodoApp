const signURL = 'http://localhost:3000/users'

const inputs = document.querySelectorAll('input')
const loginBtn = document.querySelector('#sign-in')

const name = inputs[0]
const age = inputs[1]
const email = inputs[2]
const password = inputs[3]



const signRequest = (name,age,email,password)=>{
    
    fetch( signURL , {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({email:email.value,password:password.value,name:name.value,age: age.value}), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json',
  
          }
      }).then(res => res.json())
      .then(response =>  {

        const   userToken = response.token
          
         if(!userToken){

        return  window.location.href = 'http://localhost:3000';

                     }

    localStorage.setItem('token',userToken)

    window.location.href = 'http://localhost:3000/homePage.html';

      } )
      .catch(error => console.error('Error:', error))
}


loginBtn.addEventListener('click',()=>{

    signRequest(name,age,email,password)



})

