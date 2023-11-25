
class Todo {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
  }

  markAsCompleted() {
    this.completed = true;
  }
}

module.exports = Todo;