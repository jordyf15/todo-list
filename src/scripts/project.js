import {v4 as uuidv4} from 'uuid';
class Project{
    #id;
    #name;
    #todos;
    constructor(name){
        this.#id = uuidv4();
        this.#name = name;
        this.#todos = [];
    }

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get todos(){
        return this.#todos;
    }

    set name(name){
        this.#name = name;
    }

    addTodo(todo){
        this.#todos.add(todo);
    }

    removeTodo(todoId){
        this.#todos = this.#todos.filter((todo)=> todo.id != todoId);
    }
}

export {
    Project
}