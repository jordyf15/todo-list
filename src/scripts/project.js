import { v4 as uuidv4 } from 'uuid';

class Project {
    id;

    name;

    todos;

    constructor(name) {
      this.id = uuidv4();
      this.name = name;
      this.todos = [];
    }

    addTodo(todo) {
      this.todos.push(todo);
    }

    removeTodo(todoId) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    }
}

export default Project;
