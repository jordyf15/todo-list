import app from './app.js';

function renderSkeleton(){
    renderHeader();
    renderMain();
    renderFooter();
}

function renderHeader(){
    const body = document.querySelector('body');
    const header = document.createElement('header');
    body.appendChild(header);
    const title = document.createElement('h1');
    title.textContent = 'Todo-list';
    header.appendChild(title);
}

function renderMain(){
    const body = document.querySelector('body');
    const main = document.createElement('main');
    body.appendChild(main);

    const projectSection = document.createElement('section');
    projectSection.id = 'project-section';
    const projectList = document.createElement('ul');
    projectList.id = 'project-list';
    projectSection.appendChild(projectList);
    main.appendChild(projectSection);
    renderSavedProjects();

    const todoListSection = document.createElement('section');
    todoListSection.id = 'todo-list-section';
    main.appendChild(todoListSection);
}

function renderFooter(){
    const body = document.querySelector('body');
    const footer = document.createElement('footer');
    body.appendChild(footer);
    const footerText = document.createElement('p');
    footer.appendChild(footerText);
    const githubAnchor = document.createElement('a');
    githubAnchor.href = 'https://github.com/jordyf15';
    githubAnchor.target = '_blank';
    githubAnchor.innerHTML = '<i class="fab fa-github-square"></i>';
    footerText.appendChild(githubAnchor);

    const createdByInfo = document.createElement('span');
    createdByInfo.textContent = ' Created by Jordy Ferdian ';
    footerText.appendChild(createdByInfo);

    const linkedinAnchor = document.createElement('a');
    linkedinAnchor.href = 'https://www.linkedin.com/in/jordy-ferdian-3606041a7/';
    linkedinAnchor.target = '_blank';
    linkedinAnchor.innerHTML = '<i class="fab fa-linkedin"></i>';
    footerText.appendChild(linkedinAnchor);
}

function renderSavedProjects(){
    const projectSection = document.querySelector('#project-section');
    const projectList = document.querySelector('#project-list');

    const projects = app.getStorage();
    projects.forEach((project)=>{
        renderProject(project, projectList);
    });

    const addProjectButton = document.createElement('button');
    addProjectButton.id = "add-project-button";
    addProjectButton.textContent = '+ Add Project';
    addProjectButton.addEventListener('click', displayAddProjectForm);
    projectSection.appendChild(addProjectButton);
}

function renderProjectTodos(projectId){
    const todoListSection = document.querySelector('#todo-list-section');
    todoListSection.innerHTML = '';
  
    const todoList = document.createElement('ul');
    todoList.id = 'todo-list';
    todoListSection.appendChild(todoList);

    const projectTodos = app.getProjectTodos(projectId);
    projectTodos.forEach((todo)=>{
        renderTodoListItem(todo);
    });

    const addTodoButton = createAddTodoButton(projectId);
    todoListSection.appendChild(addTodoButton);
}

function createAddTodoButton(projectId){
    const addTodoButton = document.createElement("button");
    addTodoButton.id = 'add-todo-button';
    addTodoButton.textContent = '+ add todo';
    addTodoButton.addEventListener('click', (e)=>{
        e.stopPropagation();
        renderAddTodoForm(projectId);
    });
    return addTodoButton;
}

function renderAddTodoForm(projectId){
    const todoListSection = document.querySelector('#todo-list-section');
    const addTodoButton = document.querySelector('#add-todo-button');
    todoListSection.removeChild(addTodoButton);

    const addTodoForm = document.createElement('form');
    addTodoForm.id = 'add-todo-form';
    todoListSection.appendChild(addTodoForm);
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Title';
    titleInput.id = 'title-input';
    titleInput.required = true;
    addTodoForm.appendChild(titleInput);

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.placeholder = 'Description';
    descriptionInput.id = 'description-input';
    descriptionInput.required = true;
    addTodoForm.appendChild(descriptionInput);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'duedate-input';
    dueDateInput.required= true;
    addTodoForm.appendChild(dueDateInput);

    const priorityInput = document.createElement('input');
    priorityInput.type = 'number';
    priorityInput.id = 'priority-input';
    priorityInput.required = true;
    addTodoForm.appendChild(priorityInput);

    const errorMessage = document.createElement('p');
    errorMessage.id = 'error-msg';
    addTodoForm.appendChild(errorMessage);

    const confirmAddButton = document.createElement('button');
    confirmAddButton.textContent = 'Add';
    confirmAddButton.type = 'button';
    confirmAddButton.addEventListener('click', ()=> {
        const title = titleInput.value;
        const description = descriptionInput.value;
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        addTodoToProject(projectId, title, description, dueDate, priority);
    });
    addTodoForm.appendChild(confirmAddButton);

    const cancelAddButton = document.createElement('button');
    cancelAddButton.textContent = 'Cancel';
    cancelAddButton.type = 'button';
    cancelAddButton.addEventListener('click', ()=>{
        cancelAddTodoToProject(projectId);
    });

    addTodoForm.appendChild(cancelAddButton);
}

function addTodoToProject(projectId, title, description, dueDate, priority){
    if(title === "" || description === "" || dueDate === "" || priority === "" || isNaN(priority) ||
     (dueDate instanceof Date && !isNaN(dueDate))){
        const errorMessage = document.querySelector('#error-msg');
        errorMessage.textContent = 'Please fill all the field';
    } else {
        const todoListSection = document.querySelector('#todo-list-section');
        const addTodoForm = document.querySelector('#add-todo-form');
        const newTodo = app.addTodoToProject(projectId, title, description, dueDate, priority);
        todoListSection.removeChild(addTodoForm);
        const addTodoButton = createAddTodoButton(projectId);
        todoListSection.appendChild(addTodoButton);
        renderTodoListItem(newTodo);
    }
}

function cancelAddTodoToProject(projectId){
    const todoListSection = document.querySelector('#todo-list-section');
    const addTodoForm = document.querySelector('#add-todo-form');
    todoListSection.removeChild(addTodoForm);
    const addTodoButton = createAddTodoButton(projectId);
    todoListSection.appendChild(addTodoButton);
}

function renderTodoListItem(todo){
    const todoList = document.querySelector('#todo-list');
    const todoListItem = document.createElement('li');
    todoListItem.className = 'todo-list-item';
    todoListItem.addEventListener('click', ()=>{
        console.log(todo.id);
    });
    todoList.appendChild(todoListItem);
}

function displayAddProjectForm(){
    const projectSection = document.querySelector('#project-section');
    const addProjectButton = document.querySelector('#add-project-button');
    projectSection.removeChild(addProjectButton);

    const addProjectForm = document.createElement('form');
    addProjectForm.id = 'add-project-form';
    projectSection.appendChild(addProjectForm);


    const addProjectInput = document.createElement('input');
    addProjectInput.type = 'text';
    addProjectInput.placeholder = 'Project name';
    addProjectInput.id = 'add-project-input';
    addProjectInput.required = true;
    addProjectForm.appendChild(addProjectInput);

    const alert = document.createElement('p');
    alert.id = 'alert-message';
    addProjectForm.appendChild(alert);

    const confirmAddProjectButton = document.createElement('button');
    confirmAddProjectButton.type = 'button';
    confirmAddProjectButton.id = 'confirm-add-project-button';
    confirmAddProjectButton.textContent = 'Add';
    confirmAddProjectButton.addEventListener('click', ()=>{
        addProject(addProjectInput.value);
    });
    addProjectForm.appendChild(confirmAddProjectButton);

    const cancelProjectButton = document.createElement('button');
    cancelProjectButton.type = 'button';
    cancelProjectButton.id = 'cancel-add-project-button';
    cancelProjectButton.textContent = 'Cancel';
    cancelProjectButton.addEventListener('click', cancelAddProject);
    addProjectForm.appendChild(cancelProjectButton);
}

function addProject(projectName){
    if(projectName.trim() == ""){
        const alert = document.querySelector('#alert-message');
        alert.textContent = 'Project name cannot be empty';
    }else{
        const newProject = app.addProject(projectName);
        const projectSection = document.querySelector('#project-section');
        const addProjectForm = document.querySelector('#add-project-form');
        projectSection.removeChild(addProjectForm);
        renderProject(newProject, projectSection);
    }
}

function renderProject(project, parent){
    const viewProject = document.createElement('li');
    viewProject.className = 'project-list-items';
    viewProject.textContent = project.name;
    viewProject.addEventListener('click',()=>{
        renderProjectTodos(project.id);
    });

    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.className = 'delete-project-buttons';
    deleteProjectButton.textContent = 'X';
    deleteProjectButton.addEventListener('click', (e)=>{
        e.stopPropagation();
        deleteProject(project.id);
        parent.removeChild(viewProjectButton);
    });
    viewProject.appendChild(deleteProjectButton);

    parent.appendChild(viewProject);
}

function deleteProject(id){
    app.deleteProject(id);
}

function cancelAddProject(){
    const addProjectForm = document.querySelector('#add-project-form');
    const projectSection = document.querySelector('#project-section');
    projectSection.removeChild(addProjectForm);

    const addProjectButton = document.createElement('button');
    addProjectButton.id = "add-project-button";
    addProjectButton.textContent = '+ Add Project';
    addProjectButton.addEventListener('click', displayAddProjectForm);
    projectSection.appendChild(addProjectButton);
}

export {
    renderSkeleton
}