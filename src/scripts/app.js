import {Project} from './project';

const app = (function(){
    let storage = [];
    if(localStorage.getItem("todo-list")){
        console.log(localStorage.getItem("todo-list"))
        storage = JSON.parse(localStorage.getItem("todo-list"));
    }else{
        setDefaultStorage();
        console.log(storage);
        console.log(JSON.stringify(storage));
        // localStorage.setItem('todo-list', JSON.stringify(storage));
    }

    function setDefaultStorage(){
        const defaultProject = new Project('Default');
        const test = new Project('asd');
        console.log(defaultProject);
        console.log(JSON.stringify(defaultProject));
        storage.push(defaultProject);
        storage.push(test);
    }

    function getStorage(){
        return storage;
    }

    return {getStorage}
})();

export default app;