import { TaskList } from "./TaskList.js";

export function getTasks() {
  const savedTasksLists = localStorage.getItem("tasksList");
  if (savedTasksLists === null) {
    return [];
  } else {
    try {
      const array = JSON.parse(savedTasksLists);
      return array.map((object) => {
        return TaskList.fromJSON(object);
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export function updateTasks(tasksListArray) {
  localStorage.setItem("tasksList", JSON.stringify(tasksListArray));
}

export function deleteTask(tasksListArray, currentListName, nameToDelete) {
  const tasksList = tasksListArray.find(
    (list) => list.name === currentListName
  );
  if (!tasksList) {
    console.log("Task List Not found");
  } else {
    tasksList.deleteTask(nameToDelete);
  }
  updateTasks(tasksListArray);
}

export function addTask(tasksListArray, currentListName, task) {
  const tasksList = tasksListArray.find(
    (list) => list.name === currentListName
  );
  if (!tasksList) {
    console.log("Task List Not found");
  } else {
    tasksList.addTask(task);
  }
  updateTasks(tasksListArray);
}
