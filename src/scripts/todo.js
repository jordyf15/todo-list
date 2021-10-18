import {v4 as uuidv4} from 'uuid';
class Todo{
    #id;
    #title;
    #description;
    #dueDate;
    #priority;
    #done;
    constructor(title, description, dueDate, priority){
        this.#id = uuidv4();
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#done = false;
    }

    get id(){
        return this.#id;
    }

    get title(){
        return this.#title;
    }

    get description(){
        return this.#description;
    }

    get dueDate(){
        return this.#dueDate;
    }

    get priority() {
        return this.#priority;
    }

    get done(){
        return this.#done;
    }

    set title(title){
        this.#title = title;
    }

    set description(description){
        this.#description = description;
    }

    set dueDate(dueDate){
        this.#dueDate = dueDate;
    }

    set priority(priority){
        this.#priority = priority;
    }

    set done(done){
        this.#done = done;
    }
}

export {
    Todo,
}