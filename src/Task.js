import { formatISO, parseISO } from "date-fns";

export class Task {
  constructor(name, date, priority, description = null, done = false) {
    this.name = name;
    this.dueDate = date;
    this.priority = priority;
    this.description = description;
    this.done = done;
  }

  toggle() {
    this.done = !this.done;
  }

  toJSON() {
    return {
      name: this.name,
      dueDate: formatISO(this.dueDate),
      priority: this.priority,
      description: this.description,
      done: this.done,
    };
  }

  static fromJSON(json) {
    return new Task(
      json.name,
      parseISO(json.dueDate),
      json.priority,
      json.description,
      json.done
    );
  }
}
