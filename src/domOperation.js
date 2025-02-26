import {
  deleteTask,
  updateTasks,
  changeList,
  hasList,
  addList,
  getTasks,
  getList,
} from "./storageOperation";
import { intlFormat, intlFormatDistance, constructNow } from "date-fns";

export function createMinusSvg() {
  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "w-6 h-6 text-gray-800 dark:text-white");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 24 24");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("d", "M5 12h14");

  svg.appendChild(path);

  return svg;
}

export function createRoundedSquareSvg() {
  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("viewBox", "0 -960 960 960");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"
  );

  svg.appendChild(path);

  return svg;
}

export function createTask(task, tasksListArray) {
  const taskList = document.getElementById("task-list");
  const newTaskListItem = document.createElement("li");
  const newTaskCheckbox = document.createElement("input");
  const newTaskName = document.createElement("span");
  const newTaskButton = document.createElement("button");
  const divPrimaryRow = document.createElement("div");
  divPrimaryRow.classList.add("primary-row");

  newTaskName.textContent = task.name;
  newTaskCheckbox.type = "checkbox";
  newTaskCheckbox.checked = task.done;
  newTaskName.classList.toggle("active", task.done);
  newTaskCheckbox.addEventListener("change", () => {
    task.toggle();
    newTaskName.classList.toggle("active", task.done);
    updateTasks(tasksListArray);
  });
  newTaskButton.appendChild(createMinusSvg());
  newTaskButton.classList.add("button-secondary");
  newTaskButton.addEventListener("click", () => {
    newTaskButton.parentElement.parentElement.remove();
    deleteTask(tasksListArray, getList(), task.name);
  });

  divPrimaryRow.appendChild(newTaskCheckbox);
  divPrimaryRow.appendChild(newTaskName);
  divPrimaryRow.appendChild(newTaskButton);

  const taskPriority = document.createElement("span");
  const taskDescription = document.createElement("span");
  const taskDate = document.createElement("span");
  const divSecondaryRow = document.createElement("div");
  divSecondaryRow.classList.add("secondary-row");

  taskPriority.textContent = task.priority;
  taskDescription.textContent = task.description;
  taskDate.textContent = `${intlFormat(task.dueDate, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })}, ${intlFormatDistance(task.dueDate, `${constructNow()}`)}`;

  divSecondaryRow.appendChild(taskPriority);
  divSecondaryRow.appendChild(taskDescription);
  divSecondaryRow.appendChild(taskDate);

  newTaskListItem.appendChild(divPrimaryRow);
  newTaskListItem.appendChild(divSecondaryRow);
  taskList.appendChild(newTaskListItem);
}

export function createList(name, forceSelected = false) {
  const menuAddTaskListButton = document.getElementById("create-list-btn");
  const newListContainer = document.createElement("div");
  const newListName = document.createElement("span");
  newListName.textContent = name;
  newListContainer.appendChild(createRoundedSquareSvg());
  newListContainer.appendChild(newListName);
  menuAddTaskListButton.parentElement.insertBefore(
    newListContainer,
    menuAddTaskListButton
  );
  newListContainer.addEventListener("click", () => {
    newListContainer.parentElement
      .querySelectorAll("div")
      .forEach((element) => element.classList.toggle("selected", false));
    newListContainer.classList.toggle("selected", true);
    changeList(name);
    loadListTasks(name);
  });
  newListContainer.classList.toggle("selected", forceSelected);
}

export function createListForm() {
  const menuAddTaskListButton = document.getElementById("create-list-btn");
  const newListContainer = document.createElement("div");
  const newListNameInput = document.createElement("input");

  newListNameInput.type = "text";
  newListContainer.appendChild(newListNameInput);
  menuAddTaskListButton.parentElement.insertBefore(
    newListContainer,
    menuAddTaskListButton
  );
  newListNameInput.focus();
  newListNameInput.addEventListener("focusout", () => {
    newListContainer.remove();
  });
  newListNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const name = newListNameInput.value.trim();
      if (!hasList(name)) {
        newListContainer.remove();
        addList(name);
        if (!getList()) {
          createList(name, true);
          changeList(name);
        } else {
          createList(name);
        }
      }
    }
  });
}

export function loadListTasks(name) {
  const taskList = document.getElementById("task-list");
  const tasksListArray = getTasks();
  console.log(tasksListArray);
  const tasksArray =
    tasksListArray.find((list) => list.name === name).tasks || [];
  taskList.replaceChildren();
  tasksArray.forEach((task) => {
    createTask(task, tasksListArray);
  });
}

export function initialize() {
  const tasksListArray = getTasks();
  const currentListName = getList();
  tasksListArray.forEach((list) => {
    console.log(list);
    createList(list.name, list.name === currentListName);
  });
  if (currentListName) {
    loadListTasks(currentListName);
  }
}
