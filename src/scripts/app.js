import {Project} from './project';
import {Todo} from './todo';
import { isToday } from 'date-fns';

const app = (function(){
    let storage = [];
    const localStorageKey = 'todo-list';
    if(localStorage.getItem(localStorageKey)){
        storage = JSON.parse(localStorage.getItem(localStorageKey));
    }else{
        setDefaultStorage();
        localStorage.setItem(localStorageKey, JSON.stringify(storage));
    }

    function setDefaultStorage(){
        const defaultProject = new Project('Default');
        storage.push(defaultProject);
    }

    function getStorage(){
        return storage;
    }

    function addProject(projectName){
        const newProject = new Project(projectName);
        storage.push(newProject);
        localStorage.setItem(localStorageKey, JSON.stringify(storage));
        return newProject;
    }

    function addTodoToProject(projectId, title, description, dueDate, priority){
        const newTodo = new Todo(title, description, dueDate, priority);
        const project = storage.find((project)=>project.id === projectId);
        project.todos.push(newTodo);
        localStorage.setItem(localStorageKey, JSON.stringify(storage));
        return newTodo;
    }

    function deleteTodo(todoId, projectId){
        const project = storage.find((project)=> projectId === project.id);
        project.todos = project.todos.filter((todo)=>todo.id !== todoId);
        localStorage.setItem(localStorageKey, JSON.stringify(storage));
    }

    function doneTodo(todoId, projectId){
        const project = storage.find((project)=>project.id === projectId);
        const todo = project.todos.find((todo)=> todo.id === todoId);
        todo.done = !todo.done;
        localStorage.setItem(localStorageKey, JSON.stringify(storage));
    }

    function editTodo(todoId, projectId, title, description, dueDate, priority){
        const project = storage.find((project)=>project.id === projectId);
        const editedTodo = project.todos.find((todo)=>todo.id === todoId);
        editedTodo.title = title;
        editedTodo.description = description;
        editedTodo.dueDate = dueDate;
        editedTodo.priority = priority;
        localStorage.setItem(localStorageKey, JSON.stringify(storage));
    }

    function deleteProject(projectId){
        storage = storage.filter((project)=>project.id != projectId);
        localStorage.setItem(localStorageKey, JSON.stringify(storage));
    }

    function getProjectTodos(projectId){
        const selectedProject = storage.find((project)=>project.id === projectId);
        return selectedProject.todos;
    }

    function getAllTodos(){
        const todoArray = [];
        storage.forEach((project)=>{
            project.todos.forEach((todo)=>{
                todoArray.push({todo, projectId: project.id});
            });
        })
        return todoArray;
    }

    function getTodayTodos(){
        let todoArray = getAllTodos();
        todoArray = todoArray.filter((item)=>isToday(new Date(item.todo.dueDate)));
        return todoArray;
    }

    return {getStorage, addProject, deleteProject, getProjectTodos, addTodoToProject, deleteTodo, editTodo, doneTodo, getAllTodos, getTodayTodos}
})();

export default app;