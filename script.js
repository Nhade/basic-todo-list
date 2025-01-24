const taskList = document.querySelector("ul");
const taskName = document.querySelector("input");
const createButton = document.getElementById("create-btn");

createButton.addEventListener("click", ()=>{
    const name = taskName.value;
    taskName.value = '';

    const newTaskListItem = document.createElement("li");
    const newTaskCheckbox = document.createElement("input");
    const newTaskName = document.createElement("span");
    const newTaskButton = document.createElement("button");

    newTaskCheckbox.type = "checkbox";
    newTaskName.textContent = name;
    newTaskButton.textContent = "Delete";
    newTaskButton.addEventListener("click", ()=>{
        newTaskButton.parentElement.remove();
    });
    
    newTaskListItem.style.listStyleType = "none";
    newTaskListItem.appendChild(newTaskCheckbox);
    newTaskListItem.appendChild(newTaskName);
    newTaskListItem.appendChild(newTaskButton);

    taskList.appendChild(newTaskListItem);
});


const buttonList = taskList.querySelectorAll("button");

buttonList.forEach( (button) => {
    button.addEventListener("click", ()=>{
        button.parentElement.remove();
    });
});

