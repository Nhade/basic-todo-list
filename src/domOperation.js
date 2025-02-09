import { deleteTask } from "./storageOperation";
import { Task } from "./Task.js";
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

export function createTask(task, tasksArray, taskList, updateTasks) {
  const newTaskListItem = document.createElement("li");
  const newTaskCheckbox = document.createElement("input");
  const newTaskName = document.createElement("span");
  const newTaskButton = document.createElement("button");

  newTaskName.textContent = task.name;
  newTaskCheckbox.type = "checkbox";
  newTaskCheckbox.checked = task.done;
  newTaskName.classList.toggle("active", task.done);
  newTaskCheckbox.addEventListener("change", () => {
    task.toggle();
    newTaskName.classList.toggle("active", task.done);
    updateTasks(tasksArray);
  });
  newTaskButton.appendChild(createMinusSvg());
  newTaskButton.addEventListener("click", () => {
    newTaskButton.parentElement.remove();
    deleteTask(tasksArray, task.name);
    updateTasks(tasksArray);
  });

  newTaskListItem.appendChild(newTaskCheckbox);
  newTaskListItem.appendChild(newTaskName);
  newTaskListItem.appendChild(newTaskButton);

  taskList.appendChild(newTaskListItem);
}