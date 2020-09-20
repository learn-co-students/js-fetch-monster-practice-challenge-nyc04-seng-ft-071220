let monsterContainerDiv = document.querySelector("#monster-container");
let CreateMonsterDiv = document.querySelector("#create-monster");
let backBtn = document.querySelector("#back");
let forwardBtn = document.querySelector("#forward");
let pageNum = 1;

let createMonsterForm = document.createElement("form");
createMonsterForm.id = "new-monster-form";


let monsterNameInput = document.createElement("input");
monsterNameInput.classList.add("monster-name-input");
monsterNameInput.name = "monsterName";
monsterNameInput.type = "text";
monsterNameInput.placeholder = "Enter Monster Name";

let monsterAgeInput = document.createElement("input");
monsterAgeInput.classList.add("monster-age-input");
monsterAgeInput.name = "monsterAge";
monsterAgeInput.type = "text";
monsterAgeInput.placeholder = "Enter Monster Age";

let monsterDescriptionInput = document.createElement("textarea");
monsterDescriptionInput.classList.add("monster-description-input");
monsterDescriptionInput.name = "monsterDescription";
monsterDescriptionInput.placeholder = "Enter Monster Description";

let submitMonsterBtn = document.createElement("input");
submitMonsterBtn.type = "submit";
submitMonsterBtn.id = "create-new-monster-btn";
submitMonsterBtn.value = "Create Monster";



createMonsterForm.append(monsterNameInput, monsterAgeInput, monsterDescriptionInput, submitMonsterBtn);
CreateMonsterDiv.append(createMonsterForm);


createMonsterForm.addEventListener("submit", (ev) => {
    ev.preventDefault()
    let monsterName = ev.target.monsterName.value;
    let monsterAge = ev.target.monsterAge.value;
    let monsterDescription = ev.target.monsterDescription.value;
    fetch(`http://localhost:3000/monsters`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: monsterName, 
            age: monsterAge, 
            description: monsterDescription
        })
    })
        .then(res => res.json())
        .then(createMonsterDiv)
    dataBaseSize++;
    ev.target.reset();
})

fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`)
    .then(res => res.json())
    .then(monstersObjs => {
        monstersObjs.forEach(monsterObj => createMonsterDiv(monsterObj))
    });


backBtn.addEventListener("click", (evt) => {
    if (pageNum > 1){
        monsterContainerDiv.innerHTML = "";
        console.log(dataBaseSize)
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${--pageNum}`)
            .then(res => res.json())
            .then(monstersObjs => {
            monstersObjs.forEach(monsterObj => createMonsterDiv(monsterObj))
        });
    }
})

forwardBtn.addEventListener("click", (evt) => {
    monsterContainerDiv.innerHTML = "";
    console.log(dataBaseSize)
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${++pageNum}`)
        .then(res => res.json())
        .then(monstersObjs => {
            if(monstersObjs.length === 0){
                let lastPage = (dataBaseSize/50);
                lastPage = Math.ceil(lastPage);
            }
            monstersObjs.forEach(monsterObj => createMonsterDiv(monsterObj))
        });
})


let createMonsterDiv = (monsterObj) => {
    let monsterDiv = document.createElement("div");
    monsterDiv.classList.add("moster-div");

    let monsterNameH2 = document.createElement("h2");
    monsterNameH2.classList.add("monster-name");
    monsterNameH2.innerText = monsterObj.name;

    let monsterAgeH3 = document.createElement("h3");
    monsterAgeH3.classList.add("monster-age");
    monsterAgeH3.innerText = `Age: ${monsterObj.age}`

    let monsterDescriptionP = document.createElement("p");
    monsterDescriptionP.classList.add("monster-description");
    monsterDescriptionP.innerText = `Description: ${monsterObj.description}`;

    monsterDiv.append(monsterNameH2, monsterAgeH3, monsterDescriptionP);
    monsterContainerDiv.append(monsterDiv);
}

monsterDescriptionInput.addEventListener('keydown', autosize);
    function autosize(){
    var el = this;
    setTimeout(function(){
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';},0);
}

fetch(`http://localhost:3000/monsters`)
    .then(res => res.json())
    .then(monstersObjs => {
        window.dataBaseSize = monstersObjs.length;
    });
