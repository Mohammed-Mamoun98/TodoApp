const getUserTaskURL = 'http://localhost:3000/task/getUserTasks' 
const addTaskURL = 'http://localhost:3000/tasks'
const checkingBoxesURL = 'http://localhost:3000/task'

const tasksForm = document.querySelector('form')
const taskData = document.querySelectorAll('input')
const checkBoxes = document.querySelectorAll('input[type="checkbox"]')

let newTasksArray = []

var userToken = localStorage.getItem('token')



console.log(userToken);



if(!userToken){
    window.location.href('http://localhost:3000');
    console.log('object');

}














// taskData.addEventListener('click',()=>{
//     console.log(taskData[0].value);
// })





const tasksArray = ()=>{

    document.getElementById('items-num').textContent = checkBoxes.length + ' Items found'

    fetch(getUserTaskURL, {
        method: 'GET', // or 'PUT'
        //body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+userToken
          }
      }).then(res => res.json())
      .then((response) =>  {



for(let i =0;i<checkBoxes.length;i++){

    newTasksArray.push(response.tasks[i])

    checkBoxes[i].id = response.tasks[i]._id
    checkBoxes[i].checked = response.tasks[i].completed

    checkBoxes[i].addEventListener('change',()=>{
        if(checkBoxes[i].checked){
          

            fetch(checkingBoxesURL + '/check/'+checkBoxes[i].id, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({checked:checkBoxes[i].checked}), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+userToken
                  }
              }).then(res => res.json())
              .then((response) =>  {
                console.log(response);
              }).catch((e)=>{
                  console.log(e);
              })        
        }
    })
}

      } )
      .catch(error => console.error('Error:', error))
      
    
      

    }

    const addTask = ()=>{
        
        fetch(addTaskURL, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({description:taskData[0].value}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userToken
              }
          }).then(res => res.json())
          .then(response =>  console.log(JSON.stringify(response)) )
          .catch(error => console.error('Error:', error))
    }





tasksForm.addEventListener('submit',(event)=>{
    //  event.preventDefault()

    addTask()
    console.log(taskData[0].value); 

})

//     //in case of log out
// localStorage.setItem('token','')

tasksArray()




















// Array.prototype.forEach.call(checkBoxes,(checkBox)=>{
//     console.log(checkBox.tagName);
//     console.log(Array.prototype.indexOf.call(checkBox,checkBoxes));
// })