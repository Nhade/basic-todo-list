import "./style.css";
import { Task } from "./Task.js";
import { constructNow } from "date-fns";

const taskList = document.getElementById("task-list");
const taskNameInput = document.querySelector("input#task-name");
const taskCreateButton = document.getElementById("create-btn");

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
      const task = new Task(name, constructNow(), 0, "owo");
      dom.createTask(task, tasksArray, taskList, storage.updateTasks);
      storage.addTask(tasksArray, task);
      storage.updateTasks(tasksArray);
    }
  }

  taskCreateButton.addEventListener("click", () => {
    addTask();
    taskNameInput.focus();
  });

  taskNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
