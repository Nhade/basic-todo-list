const savedTasks = localStorage.getItem("tasks");
const tasksArray = (savedTasks === null) ? [] : JSON.parse(savedTasks);

const taskList = document.getElementById("task-list");
const taskNameInput = document.querySelector("input#task-name");
const taskCreateButton = document.getElementById("create-btn");

function updateTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function createTask(taskName) {
    const newTaskListItem = document.createElement("li");
    const newTaskCheckbox = document.createElement("input");
    const newTaskName = document.createElement("span");
    const newTaskButton = document.createElement("button");

    newTaskCheckbox.type = "checkbox";
    newTaskName.textContent = taskName;
    newTaskButton.textContent = "Delete";
    newTaskButton.addEventListener("click", ()=>{
        newTaskButton.parentElement.remove();
        tasksArray.splice(tasksArray.indexOf(taskName), 1);
        updateTasks();
    });
    
    newTaskListItem.style.listStyleType = "none";
    newTaskListItem.appendChild(newTaskCheckbox);
    newTaskListItem.appendChild(newTaskName);
    newTaskListItem.appendChild(newTaskButton);

    taskList.appendChild(newTaskListItem);
}

tasksArray.forEach((taskName)=>{
    createTask(taskName);
});

taskCreateButton.addEventListener("click", ()=>{
    const name = taskNameInput.value;
    taskNameInput.value = '';
    createTask(name);
    tasksArray.push(name);
    updateTasks();
});

