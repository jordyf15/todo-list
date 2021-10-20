import {Project} from './project';
import {Todo} from './todo';

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

    function deleteProject(projectId){
        storage = storage.filter((project)=>project.id != projectId);
        localStorage.setItem(localStorageKey, JSON.stringify(storage));
    }

    function getProjectTodos(projectId){
        const selectedProject = storage.find((project)=>project.id === projectId);
        return selectedProject.todos;
    }

    return {getStorage, addProject, deleteProject, getProjectTodos, addTodoToProject}
})();

export default app;