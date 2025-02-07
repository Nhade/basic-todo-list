export function getTasks() {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks === null ? [] : JSON.parse(savedTasks);
}

export function updateTasks(tasksArray) {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

export function deleteTask(tasksArray, nameToDelete) {
  tasksArray.splice(tasksArray.map((e) => e.name).indexOf(nameToDelete), 1);
}

export function addTask(tasksArray, taskObj) {
  tasksArray.push(taskObj);
}