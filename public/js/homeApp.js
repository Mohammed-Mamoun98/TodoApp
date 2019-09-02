const taskForm = document.querySelector('#task-form')
const container = document.querySelector('#whole')
const tasksForm = document.querySelector('form')
const taskData = document.querySelectorAll('input')[0]
const checkBoxes = document.querySelectorAll('input[type="checkbox"]')
var userToken = localStorage.getItem('token')

const addTaskURL = 'http://localhost:3000/tasks'
var checkingBoxesURL = 'http://localhost:3000/task/checkTask'
const getUserTaskURL = 'http://localhost:3000/task/getUserTasks' 



// taskForm[0].addEventListener('submit',(event)=>{
// event.preventDefault()
//   const description = addForm[0].value
//   console.log(description);

// })




tasksForm.addEventListener('submit',(event)=>{

    event.preventDefault()
    addNewtaskForm(taskData.value)
    addNewtask(taskData.value)
  

})


const getAllTasks = ()=>{

    fetch(getUserTaskURL,{
        method: 'GET',

        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
          }
          
        }
          ).then(res => res.json())
          .then(response => {
            const tasks = response.tasks
              // console.log(tasks);
            //  tasks.forEach((task) => {
            //     console.log(task);
            //     addNewtaskForm(task.description,task.completed,task._id)
            //     assignCheckBox()
            //  })


            tasks.forEach(task => {
                addNewtaskForm(task.description,task.completed,task._id)

            });

          }
            )
          .catch(e => console.log(e))

}


const addNewtaskForm = (description = '',completed = false,id = '')=>{


    const wholeArea = document.querySelector('#whole')
    const  body = document.createElement("div")
    body.className = 'task-container'


    const  checkBoxDiv = document.createElement("div")
    checkBoxDiv.className = 'check'

    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    checkBox.checked = completed
    checkBox.id = id
    assignCheckBox(checkBox)

    checkBoxDiv.appendChild(checkBox)

    const  descriptionDiv = document.createElement("div")
    const dummyTxt = document.createTextNode(description)

    descriptionDiv.className = 'description'

    descriptionDiv.appendChild(dummyTxt)

    body.appendChild(checkBoxDiv)
    body.appendChild(descriptionDiv)
    wholeArea.appendChild(body)
    setTimeout(()=>{

    },100)
    anime({
      targets: '.task-container',
     
      rotate: '1turn',
      backgroundColor: '#FFF',
      duration: 800
    }); 
    
    // addNewtask(description)


}

const addNewtask = (description)=>{

  fetch(addTaskURL, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({description,completed : false}), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken        
      }
  }).then(res => res.json())
  .then((response) =>  {
    console.log(response);
  }).catch((e)=>{
      console.log(e);
  })        

}



const assignCheckBox = (element)=>{

  
element.addEventListener('change',()=>{
console.log(element.id);

   fetch(checkingBoxesURL, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({checked:element.checked,id:element.id}), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken

        
      }
  }).then(res => res.json())
  .then((response) =>  {
    console.log(response);
  }).catch((e)=>{
      console.log(e);
  })        
    })


}
//assignCheckBox()

getAllTasks()












// console.log('object');
// var para = document.createElement("div");
// var txt = document.createTextNode("p");
// para.className = 'task-container'

// // taskForm.appendChild(node)
//     para.appendChild(txt)
//       container.appendChild(para)