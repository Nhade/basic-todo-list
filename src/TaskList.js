import { Task } from "./Task.js";

export class TaskList {
  constructor(name, tasks = []) {
    this.name = name;
    this.tasks = tasks;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  hasTask(taskName) {
    return this.tasks.some((task) => task.name === taskName);
  }

  deleteTask(name) {
    this.tasks.splice(this.tasks.map((e) => e.name).indexOf(name), 1);
  }

  toJSON() {
    const tasksArray = JSON.stringify(this.tasks);
    return {
      name: this.name,
      tasks: tasksArray,
    };
  }

  static fromJSON(json) {
    const tasksArray = JSON.parse(json.tasks).map((object) => {
      return Task.fromJSON(object);
    });
    return new TaskList(json.name, tasksArray);
  }
}
