import {Project} from './project';

const app = (function(){
    let storage = [];
    if(localStorage.getItem("todo-list")){
        storage = localStorage.getItem("todo-list");
    }else{
        setDefaultStorage();
        localStorage.setItem('todo-list', JSON.stringify(storage));
    }

    function setDefaultStorage(){
        const defaultProject = new Project('Default');
        storage.push(defaultProject);
    }

    function getStorage(){
        return storage;
    }

    return {getStorage}
})();

export {
    app
}