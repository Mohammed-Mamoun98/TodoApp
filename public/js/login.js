const inputs = document.querySelectorAll('input')
const loginBtn = document.querySelector('#sign-in')

const email = inputs[0]
const password = inputs[1]

var userToken = undefined

const loginURL = 'http://localhost:3000/users/login'

loginBtn.addEventListener('click',()=>{

    loginRequest(email,password)



})


const loginRequest = (email,password)=>{
    
    fetch( loginURL , {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({email:email.value,password:password.value}), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json',
  
          }
      }).then(res => res.json())
      .then(response =>  {

        const token = response.token
        console.log(token);

          if(!token){
                console.log('wrong input    ');
              return  window.location.href = 'http://localhost:3000';

          }
          localStorage.setItem('token',token)

          window.location.href = 'http://localhost:3000/homePage.html';

      } )
      .catch(error => console.error('Error:', error))
}


