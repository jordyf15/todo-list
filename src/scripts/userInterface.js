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

    const projects = app.getStorage();
    projects.forEach((project)=>{
        renderProject(project, projectSection);
    });

    const addProjectButton = document.createElement('button');
    addProjectButton.id = "add-project-button";
    addProjectButton.textContent = '+ Add Project';
    addProjectButton.addEventListener('click', displayAddProjectForm);
    projectSection.appendChild(addProjectButton);
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
        renderProject(newProject, projectSection);
    }
}

function renderProject(project, parent){
    const viewProjectButton = document.createElement('button');
    viewProjectButton.className = 'view-project-buttons';
    viewProjectButton.textContent = project.name;
    viewProjectButton.addEventListener('click',()=>{
        console.log(project.id);
    });

    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.className = 'delete-project-buttons';
    deleteProjectButton.textContent = 'X';
    deleteProjectButton.addEventListener('click', (e)=>{
        e.stopPropagation();
        deleteProject(project.id);
        parent.removeChild(viewProjectButton);
    });
    viewProjectButton.appendChild(deleteProjectButton);

    parent.appendChild(viewProjectButton);
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