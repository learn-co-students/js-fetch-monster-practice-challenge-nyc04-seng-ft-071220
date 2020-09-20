//stable elements
const createMonsterDiv=document.getElementById('create-monster')
const monsterContainer=document.getElementById('monster-container')
const backButton=document.getElementById('back')
const fwdButton=document.getElementById('forward')

//fetch first 50 monsters

function fetchMonsters(){
fetch('http://localhost:3000/monsters?_limit=50')
.then(resp => resp.json())
.then((monsterArray) =>{
   monsterArray.forEach((monster) => {
      // console.log(monster)

       let nameHead=document.createElement('h2')
           nameHead.innerText=monster.name
       let ageDiv=document.createElement('h4')
          ageDiv.innerHTML=monster.age
       let descDiv=document.createElement('p')
       descDiv.innerHTML=monster.description

       monsterContainer.append(nameHead, ageDiv, descDiv)

   })
})

}

fwdButton.addEventListener("click", (evt) =>{
    fetch('http://localhost:3000/monsters?_limit=50')
    .then(resp => resp.json())
    .then((monsterArray) =>{
       monsterArray.forEach((monster) => {
          // console.log(monster)
    
           let nameHead=document.createElement('h2')
               nameHead.innerText=monster.name
           let ageDiv=document.createElement('h4')
              ageDiv.innerHTML=monster.age
           let descDiv=document.createElement('p')
           descDiv.innerHTML=monster.description
    
           monsterContainer.append(nameHead, ageDiv, descDiv)
    
       })
    })
})


function createForm(monster){
    let monsterForm=document.createElement('form')
    let nameInput=document.createElement('input')
    nameInput.placeholder="Name: "
    nameInput.id="name"
    let ageInput=document.createElement('input')
    ageInput.placeholder="Age: "
    ageInput.id="age"
    let descripTextField=document.createElement('input')
    descripTextField.placeholder="Description: "
    descripTextField.id="description"
    let buttonSubmit=document.createElement('button')
    buttonSubmit.style.height="50px"
    buttonSubmit.style.width="90px"
    buttonSubmit.innerHTML="Submit"
    

    monsterForm.append(nameInput, ageInput, descripTextField, buttonSubmit)
    createMonsterDiv.append(monsterForm)


    monsterForm.addEventListener("submit", (e) =>{
     e.preventDefault()
      let name=nameInput.value
      let age=ageInput.value
      let description=descripTextField.value

      fetch('http://localhost:3000/monsters',{
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({
        name: name,
        age: age,
        description: description
    })
      })
      .then(resp => resp.json())
      .then((monsterCreation) => {
         
        e.target.reset() 
      })
    })
}




//instantiate function
fetchMonsters()

createForm()