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
  document.querySelectorAll(".menu-by-list div").forEach((element) => {
    const event = new Event("refresh");
    element.dispatchEvent(event);
  });
}

export function deleteTask(tasksListArray, nameToDelete) {
  const tasksList = tasksListArray.find(
    (list) => list.name === getCurrentListName()
  );
  if (!tasksList) {
    console.log("Task List Not found");
  } else {
    tasksList.deleteTask(nameToDelete);
  }
  updateTasks(tasksListArray);
}

export function addTask(task) {
  const tasksListArray = getTasks();
  tasksListArray
    .find((list) => list.name === getCurrentListName())
    .addTask(task);
  updateTasks(tasksListArray);
}

export function hasList(name) {
  const tasksListArray = getTasks();
  return tasksListArray.some((list) => list.name === name);
}

export function addList(name) {
  const tasksListArray = getTasks();
  tasksListArray.push(new TaskList(name));
  updateTasks(tasksListArray);
}

export function getList(name = "") {
  const tasksListArray = getTasks();
  if (name) {
    return tasksListArray.find((list) => list.name === name);
  } else {
    return tasksListArray.find((list) => list.name === getCurrentListName());
  }
}

export function getCurrentListName() {
  return localStorage.getItem("currentList") || "";
}

export function changeList(name) {
  localStorage.setItem("currentList", name);
}

export function getPendingTaskCount(name) {
  if (hasList(name)) {
    const tasks = getList(name).tasks;
    return tasks.filter((task) => !task.done).length;
  } else {
    return 0;
  }
}

export function currentListHasTask(name) {
  return getList().hasTask(name);
}
