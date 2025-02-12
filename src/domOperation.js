import { deleteTask } from "./storageOperation";
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

export function createTask(task, tasksArray, taskList, updateTasks) {
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
    updateTasks(tasksArray);
  });
  newTaskButton.appendChild(createMinusSvg());
  newTaskButton.classList.add("button-secondary");
  newTaskButton.addEventListener("click", () => {
    newTaskButton.parentElement.parentElement.remove();
    deleteTask(tasksArray, task.name);
    updateTasks(tasksArray);
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
