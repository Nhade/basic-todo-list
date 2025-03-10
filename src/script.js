import "./style.css";
import { Task } from "./Task.js";

const body = document.querySelector("body");
const taskNameInput = document.querySelector("input#task-name");
const taskCreateButton = document.getElementById("create-btn");
const sidebar = document.querySelector(".sidebar");
const sidebarCancelButton = document.getElementById("cancel-create");
const sidebarSaveButton = document.getElementById("save-task");
const sidebarDropdownButton = document.getElementById("dropdown-btn");
const sidebarTaskName = document.getElementById("task-name-1");
const sidebarTaskDescription = document.getElementById("task-description");
const sidebarTaskPriority = sidebarDropdownButton.querySelector("span");
const sidebarTaskHour = document.getElementById("task-hour");
const sidebarTaskMinute = document.getElementById("task-minute");
const menuAddTaskListButton = document.getElementById("create-list-btn");

let domModule = null;
let storageModule = null;

function loadDomModule() {
  if (!domModule) {
    return import(
      /* webpackChunkName = "domOperation" */ "./domOperation.js"
    ).then((module) => {
      domModule = module;
      return module;
    });
  }
  return Promise.resolve(domModule);
}

function loadStorageModule() {
  if (!storageModule) {
    return import(
      /* webpackChunkName = "storageOperation" */ "./storageOperation.js"
    ).then((module) => {
      storageModule = module;
      return module;
    });
  }
  return Promise.resolve(storageModule);
}

Promise.all([loadDomModule(), loadStorageModule()]).then(([dom, storage]) => {
  dom.initialize();

  taskCreateButton.addEventListener("click", () => {
    taskNameInput.focus();
    sidebar.style.right = "0px";
  });

  menuAddTaskListButton.addEventListener("click", dom.createListForm);

  sidebarTaskHour.addEventListener("input", (event) => {
    event.target.value = String(+event.target.value).padStart(2, "0");
  });

  sidebarTaskMinute.addEventListener("input", (event) => {
    event.target.value = String(+event.target.value).padStart(2, "0");
  });

  sidebarCancelButton.addEventListener("click", () => {
    sidebar.style.right = "-30vw";
  });

  sidebarSaveButton.addEventListener("click", () => {
    const name = sidebarTaskName.value.trim();
    if (!storage.getCurrentListName()) {
      dom.showAlert("Please create a list first!");
      return;
    }
    if (!name) {
      dom.showAlert("Task name cannot be empty!");
      return;
    }
    if (storage.currentListHasTask(name)) {
      dom.showAlert("A task with this name already exists!");
      return;
    }
    const description = sidebarTaskDescription.value;
    const date = document.getElementById("task-date");
    let year, month, day;
    [year, month, day] = date.value.split("-");
    const hour = document.getElementById("task-hour").value;
    const minute = document.getElementById("task-minute").value;
    if (!(hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59)) {
      dom.showAlert("Invalid time!");
      return;
    }
    const priority = sidebarTaskPriority.textContent;
    if (priority === "Select Priority") {
      dom.showAlert("Please select a priority!");
      return;
    }
    const datetime = new Date(year, month - 1, day, hour, minute);
    const task = new Task(name, `${datetime}`, priority, description);
    storage.addTask(task);
    dom.createTask(task, storage.getTasks());
  });

  document.querySelectorAll(".option").forEach((e) => {
    e.addEventListener("click", (event) => {
      sidebarDropdownButton.querySelector("span").textContent =
        event.target.textContent.trim();
    });
  });
});
