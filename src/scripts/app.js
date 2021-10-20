import {Project} from './project';

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

    return {getStorage, addProject}
})();

export default app;