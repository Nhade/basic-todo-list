const savedTasks = localStorage.getItem("tasks");
const tasksArray = (savedTasks === null) ? [] : JSON.parse(savedTasks);

const taskList = document.getElementById("task-list");
const taskNameInput = document.querySelector("input#task-name");
const taskCreateButton = document.getElementById("create-btn");

function updateTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function createTask(taskObj) {
    const newTaskListItem = document.createElement("li");
    const newTaskCheckbox = document.createElement("input");
    const newTaskName = document.createElement("span");
    const newTaskButton = document.createElement("button");

    newTaskName.textContent = taskObj.name;
    newTaskCheckbox.type = "checkbox";
    newTaskCheckbox.checked = taskObj.done;
    newTaskCheckbox.addEventListener("change", ()=>{
        taskObj.done = newTaskCheckbox.checked;
        updateTasks();
    });
    newTaskButton.textContent = "Delete";
    newTaskButton.addEventListener("click", ()=>{
        newTaskButton.parentElement.remove();
        tasksArray.splice(tasksArray.map((e) => e.name).indexOf(taskObj.name), 1);
        updateTasks();
    });
    
    newTaskListItem.style.listStyleType = "none";
    newTaskListItem.appendChild(newTaskCheckbox);
    newTaskListItem.appendChild(newTaskName);
    newTaskListItem.appendChild(newTaskButton);

    taskList.appendChild(newTaskListItem);
}

tasksArray.forEach((taskObj)=>{
    createTask(taskObj);
});

taskCreateButton.addEventListener("click", ()=>{
    const name = taskNameInput.value;
    if(tasksArray.includes(name)){
        
    }else{
        taskNameInput.value = '';
        const taskObj = {name: name, done: false};
        createTask(taskObj);
        tasksArray.push(taskObj);
        updateTasks();
    }
});

