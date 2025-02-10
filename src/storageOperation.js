import { Task } from "./Task.js";

export function getTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks === null) {
    return [];
  } else {
    try {
      const array = JSON.parse(savedTasks);
      return array.map((object) => {
        return Task.fromJSON(object);
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export function updateTasks(tasksArray) {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

export function deleteTask(tasksArray, nameToDelete) {
  tasksArray.splice(tasksArray.map((e) => e.name).indexOf(nameToDelete), 1);
}

export function addTask(tasksArray, task) {
  tasksArray.push(task);
}
