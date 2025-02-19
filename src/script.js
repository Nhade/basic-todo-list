import "./style.css";
import { Task } from "./Task.js";
import { constructNow } from "date-fns";

const taskList = document.getElementById("task-list");
const taskNameInput = document.querySelector("input#task-name");
const taskCreateButton = document.getElementById("create-btn");
const sidebar = document.querySelector(".sidebar");
const sidebarTaskName = document.getElementById("task-name-1");
const sidebarTaskDescription = document.getElementById("task-description");
const sidebarTaskPriority = document.getElementById("task-priority");
const sidebarTaskHour = document.getElementById("task-hour");
const sidebarTaskMinute = document.getElementById("task-minute");
const sidebarCancelButton = document.getElementById("cancel-create");
const sidebarSaveButton = document.getElementById("save-task");

let domModule = null;
let storageModule = null;

function loadDomModule() {
  if (!domModule) {
    return import(
      /* webpackChunkName = "domOperations" */ "./domOperation.js"
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
      /* webpackChunkName = "storageOperations" */ "./storageOperation.js"
    ).then((module) => {
      storageModule = module;
      return module;
    });
  }
  return Promise.resolve(storageModule);
}

Promise.all([loadDomModule(), loadStorageModule()]).then(([dom, storage]) => {
  const tasksArray = storage.getTasks();

  tasksArray.forEach((task) => {
    dom.createTask(task, tasksArray, taskList, storage.updateTasks);
  });

  function addTask() {
    const name = taskNameInput.value.trim();
    if (tasksArray.map((e) => e.name).indexOf(name) === -1 && name) {
      taskNameInput.value = "";
      const task = new Task(name, `${constructNow()}`, 0, "owo");
      dom.createTask(task, tasksArray, taskList, storage.updateTasks);
      storage.addTask(tasksArray, task);
      storage.updateTasks(tasksArray);
    }
  }

  taskCreateButton.addEventListener("click", () => {
    addTask();
    taskNameInput.focus();
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.right = "0px";
  });

  taskNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

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
    if (!tasksArray.some((task) => task.name === name) && name) {
      const description = sidebarTaskDescription.value;
      const priority = +sidebarTaskPriority.value;
      const date = document.getElementById("task-date");
      let year, month, day;
      [year, month, day] = date.value.split("-");
      const hour = document.getElementById("task-hour").value;
      const minute = document.getElementById("task-minute").value;
      if (
        !isNaN(priority) &&
        hour >= 0 &&
        hour <= 23 &&
        minute >= 0 &&
        minute <= 59
      ) {
        const datetime = new Date(year, month - 1, day, hour, minute);
        const task = new Task(name, `${datetime}`, priority, description);
        dom.createTask(task, tasksArray, taskList, storage.updateTasks);
        storage.addTask(tasksArray, task);
        storage.updateTasks(tasksArray);
      }
    }
  });
});
