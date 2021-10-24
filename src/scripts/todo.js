import { v4 as uuidv4 } from 'uuid';

class Todo {
    id;

    title;

    description;

    dueDate;

    priority;

    done;

    constructor(title, description, dueDate, priority) {
      this.id = uuidv4();
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.done = false;
    }
}

export default Todo;
