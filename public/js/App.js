const inputs = document.querySelectorAll('input')
const loginBtn = document.querySelector('#sign-in')

const email = inputs[0]
const password = inputs[1]

let userToken = undefined

const loginURL = 'http://localhost:3000/users/login'



loginBtn.addEventListener('click',()=>{

    loginRequest(email,password)
    window.location.href = 'http://localhost:3000/task/exec';



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

          userToken = response.token


          if(!userToken){


            

            //   return  window.location.href = 'http://google.com';

          }
        //   console.log(userToken);

        //   localStorage.setItem('token',userToken)

        //   window.location.href = 'http://localhost:3000/task/exec';


      } )
      .catch(error => console.error('Error:', error))
}


