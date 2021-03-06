/* eslint-disable no-use-before-define */
import { format, isValid } from 'date-fns';
import app from './app';
import logoImg from '../assets/images/todo-list-logo.png';

function updateTodoListItem(todoId, title, dueDate, priority) {
  const todoLiTitle = document.querySelector(`#todo-${todoId} .todo-title`);
  todoLiTitle.textContent = title;
  const formattedDueDate = format(new Date(dueDate), 'dd-MM-yyyy');
  const todoLiDueDate = document.querySelector(`#todo-${todoId} .todo-duedate`);
  todoLiDueDate.textContent = formattedDueDate;
  const todoLiPriority = document.querySelector(`#todo-${todoId} .todo-priority`);
  todoLiPriority.textContent = priority;
}

function checkValidTodo(title, description, dueDate, priority) {
  let valid = true;
  const titleErrorMessage = document.querySelector('#title-error-message');
  const descriptionErrorMessage = document.querySelector('#description-error-message');
  const dueDateErrorMessage = document.querySelector('#duedate-error-message');
  const priorityErrorMessage = document.querySelector('#priority-error-message');
  titleErrorMessage.textContent = '';
  descriptionErrorMessage.textContent = '';
  dueDateErrorMessage.textContent = '';
  priorityErrorMessage.textContent = '';

  if (title === '') {
    titleErrorMessage.textContent = 'Todo Title cannot be empty';
    valid = false;
  }
  if (description === '') {
    descriptionErrorMessage.textContent = 'Todo description cannot be empty';
    valid = false;
  }
  if (dueDate === '' || !isValid(new Date(dueDate))) {
    dueDateErrorMessage.textContent = 'Todo due date is not valid';
    valid = false;
  }
  if (priority < 1 || priority > 5) {
    priorityErrorMessage.textContent = 'Todo priority must be between 1 and 5';
    valid = false;
  }
  return valid;
}

function editTodo(todoId, projectId, {
  title, description, dueDate, priority,
}) {
  if (checkValidTodo(title, description, dueDate, priority)) {
    app.editTodo(todoId, projectId, title, description, dueDate, priority);
    const viewTodoForm = document.querySelector('#view-todo-form');
    const buttonContainer = document.querySelector('#edit-todo-button-container');
    viewTodoForm.removeChild(buttonContainer);

    const enableEditTodoButton = document.querySelector('#enable-edit-todo-button');
    enableEditTodoButton.disabled = false;
    const viewTodoTitle = document.querySelector('#view-todo-title');
    viewTodoTitle.disabled = true;
    const viewTodoDescription = document.querySelector('#view-todo-description');
    viewTodoDescription.disabled = true;
    const viewTodoDueDate = document.querySelector('#view-todo-duedate');
    viewTodoDueDate.disabled = true;
    const viewTodoPriority = document.querySelector('#view-todo-priority');
    viewTodoPriority.disabled = true;
    updateTodoListItem(todoId, title, dueDate, priority);
  }
}

function cancelEditTodo(prevTitle, prevDescription, prevDueDate, prevPriority) {
  const viewTodoForm = document.querySelector('#view-todo-form');
  const buttonContainer = document.querySelector('#edit-todo-button-container');

  const enableEditTodoButton = document.querySelector('#enable-edit-todo-button');
  enableEditTodoButton.disabled = false;

  const titleErrorMessage = document.querySelector('#title-error-message');
  const descriptionErrorMessage = document.querySelector('#description-error-message');
  const dueDateErrorMessage = document.querySelector('#duedate-error-message');
  const priorityErrorMessage = document.querySelector('#priority-error-message');

  titleErrorMessage.textContent = '';
  descriptionErrorMessage.textContent = '';
  dueDateErrorMessage.textContent = '';
  priorityErrorMessage.textContent = '';

  const viewTodoTitle = document.querySelector('#view-todo-title');
  viewTodoTitle.disabled = true;
  viewTodoTitle.value = prevTitle;
  const viewTodoDescription = document.querySelector('#view-todo-description');
  viewTodoDescription.disabled = true;
  viewTodoDescription.value = prevDescription;
  const viewTodoDueDate = document.querySelector('#view-todo-duedate');
  viewTodoDueDate.disabled = true;
  viewTodoDueDate.value = prevDueDate;
  const viewTodoPriority = document.querySelector('#view-todo-priority');
  viewTodoPriority.disabled = true;
  viewTodoPriority.value = prevPriority;

  viewTodoForm.removeChild(buttonContainer);
}

function enableEditTodoDetail(todoId, projectId) {
  const viewTodoForm = document.querySelector('#view-todo-form');
  const viewTodoTitle = document.querySelector('#view-todo-title');
  viewTodoTitle.disabled = false;
  const viewTodoDescription = document.querySelector('#view-todo-description');
  viewTodoDescription.disabled = false;
  const viewTodoDueDate = document.querySelector('#view-todo-duedate');
  viewTodoDueDate.disabled = false;
  const viewTodoPriority = document.querySelector('#view-todo-priority');
  viewTodoPriority.disabled = false;

  const prevTitle = viewTodoTitle.value;
  const prevDescription = viewTodoDescription.value;
  const prevDueDate = viewTodoDueDate.value;
  const prevPriority = viewTodoPriority.value;

  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'edit-todo-button-container';
  viewTodoForm.appendChild(buttonContainer);

  const editTodoButton = document.createElement('button');
  editTodoButton.id = 'edit-todo-button';
  editTodoButton.textContent = 'Edit';
  editTodoButton.type = 'button';
  editTodoButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const title = viewTodoTitle.value;
    const description = viewTodoDescription.value;
    const dueDate = viewTodoDueDate.value;
    const priority = viewTodoPriority.value;
    editTodo(todoId, projectId, {
      title, description, dueDate, priority,
    });
  });
  buttonContainer.appendChild(editTodoButton);

  const cancelEditTodoButton = document.createElement('button');
  cancelEditTodoButton.id = 'cancel-edit-todo-button';
  cancelEditTodoButton.textContent = 'Cancel';
  cancelEditTodoButton.type = 'button';
  cancelEditTodoButton.addEventListener('click', (e) => {
    e.stopPropagation();
    cancelEditTodo(prevTitle, prevDescription, prevDueDate, prevPriority);
  });
  buttonContainer.appendChild(cancelEditTodoButton);
}

function deleteTodo(todoId, projectId) {
  app.deleteTodo(todoId, projectId);
}

function viewTodoDetail(todo, projectId) {
  const todoListSection = document.querySelector('#todo-list-section');

  const viewTodoContainer = document.createElement('div');
  viewTodoContainer.id = 'view-todo-container';
  todoListSection.appendChild(viewTodoContainer);

  const viewTodoForm = document.createElement('form');
  viewTodoForm.id = 'view-todo-form';
  viewTodoContainer.appendChild(viewTodoForm);

  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'view-todo-detail-button-container';
  viewTodoForm.appendChild(buttonContainer);

  const viewTodoTitle = document.createElement('input');
  viewTodoTitle.value = todo.title;
  viewTodoTitle.type = 'text';
  viewTodoTitle.id = 'view-todo-title';
  viewTodoTitle.disabled = true;
  viewTodoForm.appendChild(viewTodoTitle);

  const titleErrorMessage = document.createElement('p');
  titleErrorMessage.className = 'error-message';
  titleErrorMessage.id = 'title-error-message';
  viewTodoForm.appendChild(titleErrorMessage);

  const viewTodoDescription = document.createElement('input');
  viewTodoDescription.value = todo.description;
  viewTodoDescription.type = 'text';
  viewTodoDescription.id = 'view-todo-description';
  viewTodoDescription.disabled = true;
  viewTodoForm.appendChild(viewTodoDescription);

  const descriptionErrorMessage = document.createElement('p');
  descriptionErrorMessage.className = 'error-message';
  descriptionErrorMessage.id = 'description-error-message';
  viewTodoForm.appendChild(descriptionErrorMessage);

  const viewTodoPriority = document.createElement('input');
  viewTodoPriority.value = todo.priority;
  viewTodoPriority.type = 'number';
  viewTodoPriority.min = '1';
  viewTodoPriority.max = '5';
  viewTodoPriority.id = 'view-todo-priority';
  viewTodoPriority.disabled = true;
  viewTodoForm.appendChild(viewTodoPriority);

  const priorityErrorMessage = document.createElement('p');
  priorityErrorMessage.className = 'error-message';
  priorityErrorMessage.id = 'priority-error-message';
  viewTodoForm.appendChild(priorityErrorMessage);

  const viewTodoDueDate = document.createElement('input');
  viewTodoDueDate.value = todo.dueDate;
  viewTodoDueDate.type = 'date';
  viewTodoDueDate.id = 'view-todo-duedate';
  viewTodoDueDate.disabled = true;
  viewTodoForm.appendChild(viewTodoDueDate);

  const dueDateErrorMessage = document.createElement('p');
  dueDateErrorMessage.className = 'error-message';
  dueDateErrorMessage.id = 'duedate-error-message';
  viewTodoForm.appendChild(dueDateErrorMessage);

  const errorMessage = document.createElement('p');
  errorMessage.id = 'error-message';
  viewTodoForm.appendChild(errorMessage);

  const enableEditTodoButton = document.createElement('button');
  enableEditTodoButton.innerHTML = '<i class="far fa-edit"></i>';
  enableEditTodoButton.id = 'enable-edit-todo-button';
  enableEditTodoButton.type = 'button';
  enableEditTodoButton.addEventListener('click', (e) => {
    e.stopPropagation();
    enableEditTodoButton.disabled = true;
    enableEditTodoDetail(todo.id, projectId);
  });
  buttonContainer.appendChild(enableEditTodoButton);

  const exitViewButton = document.createElement('button');
  exitViewButton.innerHTML = '<i class="fas fa-times"></i>';
  exitViewButton.type = 'button';
  exitViewButton.id = 'exit-view-todo';
  exitViewButton.addEventListener('click', (e) => {
    e.stopPropagation();
    todoListSection.removeChild(viewTodoContainer);
  });
  buttonContainer.appendChild(exitViewButton);
}

function renderTodoListItem(todo, projectId) {
  const todoList = document.querySelector('#todo-list');
  const todoListItem = document.createElement('li');

  const lineThroughDecor = document.createElement('div');
  lineThroughDecor.className = 'line-through-decor';
  todoListItem.appendChild(lineThroughDecor);

  const todoListItemLeftPart = document.createElement('div');
  const todoListItemRightPart = document.createElement('div');
  todoListItem.appendChild(todoListItemLeftPart);
  todoListItem.appendChild(todoListItemRightPart);

  todoListItem.className = 'todo-list-item';
  todoListItem.id = `todo-${todo.id}`;
  todoListItem.addEventListener('click', () => {
    viewTodoDetail(todo, projectId);
    const projectSection = document.querySelector('#project-section');
    projectSection.classList.remove('open');
    const hamburgerButton = document.querySelector('#hamburger-button');
    hamburgerButton.classList.remove('hamburger-button-clicked');
  });
  todoList.appendChild(todoListItem);

  const checkboxContainer = document.createElement('label');
  checkboxContainer.className = 'checkbox-container';
  todoListItemLeftPart.appendChild(checkboxContainer);

  const todoCheckBox = document.createElement('input');
  todoCheckBox.className = 'todo-cb';
  todoCheckBox.type = 'checkbox';
  todoCheckBox.addEventListener('click', (e) => {
    e.stopPropagation();
    todoListItem.classList.toggle('done-todo');
    app.doneTodo(todo.id, projectId);
  });

  if (todo.done) {
    todoListItem.classList.toggle('done-todo');
    todoCheckBox.checked = true;
  }

  checkboxContainer.appendChild(todoCheckBox);

  const checkmark = document.createElement('span');
  checkmark.className = 'checkmark';
  checkmark.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  checkboxContainer.appendChild(checkmark);

  const todoTitle = document.createElement('span');
  todoTitle.className = 'todo-title';
  todoTitle.textContent = todo.title;
  todoListItemLeftPart.appendChild(todoTitle);

  const todoDueDate = document.createElement('span');
  todoDueDate.className = 'todo-duedate';
  const dueDate = new Date(todo.dueDate);
  todoDueDate.textContent = format(dueDate, 'dd-MM-yyyy');
  todoListItemRightPart.appendChild(todoDueDate);

  const todoPriority = document.createElement('span');
  todoPriority.className = 'todo-priority';
  todoPriority.textContent = todo.priority;
  todoListItemRightPart.appendChild(todoPriority);

  const deleteTodoButton = document.createElement('button');
  deleteTodoButton.className = 'delete-todo-button';
  deleteTodoButton.innerHTML = '<i class="far fa-trash-alt"></i>';
  deleteTodoButton.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteTodo(todo.id, projectId);
    todoList.removeChild(todoListItem);
  });
  todoListItemRightPart.appendChild(deleteTodoButton);
}

function renderAllTodos() {
  const allTodos = app.getAllTodos();
  const todoListSection = document.querySelector('#todo-list-section');
  todoListSection.innerHTML = '';

  const todoListTitle = document.createElement('h2');
  todoListTitle.textContent = 'Home';
  todoListSection.appendChild(todoListTitle);

  const todoList = document.createElement('ul');
  todoList.id = 'todo-list';
  todoListSection.appendChild(todoList);

  allTodos.forEach((item) => {
    renderTodoListItem(item.todo, item.projectId);
  });
}

function renderTodayTodos() {
  const todayTodos = app.getTodayTodos();
  const todoListSection = document.querySelector('#todo-list-section');
  todoListSection.innerHTML = '';

  const todoListTitle = document.createElement('h2');
  todoListTitle.textContent = 'Today';
  todoListSection.appendChild(todoListTitle);

  const todoList = document.createElement('ul');
  todoList.id = 'todo-list';
  todoListSection.appendChild(todoList);

  todayTodos.forEach((item) => {
    renderTodoListItem(item.todo, item.projectId);
  });
}

function renderThisWeekTodos() {
  const thisWeekTodos = app.getThisWeekTodos();
  const todoListSection = document.querySelector('#todo-list-section');
  todoListSection.innerHTML = '';

  const todoListTitle = document.createElement('h2');
  todoListTitle.textContent = 'This Week';
  todoListSection.appendChild(todoListTitle);

  const todoList = document.createElement('ul');
  todoList.id = 'todo-list';
  todoListSection.appendChild(todoList);

  thisWeekTodos.forEach((item) => {
    renderTodoListItem(item.todo, item.projectId);
  });
}

function renderHeader() {
  const body = document.querySelector('body');
  const header = document.createElement('header');
  body.appendChild(header);

  const hamburgerButton = document.createElement('button');
  hamburgerButton.id = 'hamburger-button';
  hamburgerButton.innerHTML = '<i class="fas fa-bars"></i>';
  hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('hamburger-button-clicked');
    const projectSection = document.querySelector('#project-section');
    projectSection.classList.toggle('open');
  });
  header.appendChild(hamburgerButton);

  const logo = document.createElement('img');
  logo.alt = 'a checked checkbox';
  logo.src = logoImg;
  logo.id = 'logo-img';
  header.appendChild(logo);

  const title = document.createElement('h1');
  title.textContent = 'Todo-list';
  header.appendChild(title);
}

function createAddTodoButton(projectId) {
  const addTodoButton = document.createElement('button');
  addTodoButton.id = 'add-todo-button';
  addTodoButton.innerHTML = '<i class="fas fa-plus-circle"></i> Add Todo';
  addTodoButton.addEventListener('click', (e) => {
    e.stopPropagation();
    renderAddTodoForm(projectId);
  });
  return addTodoButton;
}

function addTodoToProject(projectId, title, description, dueDate, priority) {
  if (checkValidTodo(title, description, dueDate, priority)) {
    const todoListSection = document.querySelector('#todo-list-section');
    const addTodoForm = document.querySelector('#add-todo-form');
    const newTodo = app.addTodoToProject(projectId, title, description, dueDate, priority);
    todoListSection.removeChild(addTodoForm);
    const addTodoButton = createAddTodoButton(projectId);
    todoListSection.appendChild(addTodoButton);
    renderTodoListItem(newTodo, projectId);
  }
}

function renderAddTodoForm(projectId) {
  const todoListSection = document.querySelector('#todo-list-section');
  const addTodoButton = document.querySelector('#add-todo-button');
  todoListSection.removeChild(addTodoButton);

  const addTodoForm = document.createElement('form');
  addTodoForm.id = 'add-todo-form';
  todoListSection.appendChild(addTodoForm);

  const addTodoFormTitle = document.createElement('h3');
  addTodoFormTitle.id = 'add-todo-form-title';
  addTodoFormTitle.textContent = 'Add Todo';
  addTodoForm.appendChild(addTodoFormTitle);

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Title';
  titleInput.id = 'title-input';
  titleInput.required = true;
  addTodoForm.appendChild(titleInput);

  const titleErrorMessage = document.createElement('p');
  titleErrorMessage.className = 'error-message';
  titleErrorMessage.id = 'title-error-message';
  addTodoForm.appendChild(titleErrorMessage);

  const descriptionInput = document.createElement('input');
  descriptionInput.type = 'text';
  descriptionInput.placeholder = 'Description';
  descriptionInput.id = 'description-input';
  descriptionInput.required = true;
  addTodoForm.appendChild(descriptionInput);

  const descriptionErrorMessage = document.createElement('p');
  descriptionErrorMessage.className = 'error-message';
  descriptionErrorMessage.id = 'description-error-message';
  addTodoForm.appendChild(descriptionErrorMessage);

  const priorityInput = document.createElement('input');
  priorityInput.type = 'number';
  priorityInput.id = 'priority-input';
  priorityInput.required = true;
  priorityInput.min = '1';
  priorityInput.max = '5';
  priorityInput.placeholder = 'Priority (1-5)';
  addTodoForm.appendChild(priorityInput);

  const priorityErrorMessage = document.createElement('p');
  priorityErrorMessage.className = 'error-message';
  priorityErrorMessage.id = 'priority-error-message';
  addTodoForm.appendChild(priorityErrorMessage);

  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  dueDateInput.id = 'duedate-input';
  dueDateInput.required = true;
  addTodoForm.appendChild(dueDateInput);

  const dueDateErrorMessage = document.createElement('p');
  dueDateErrorMessage.className = 'error-message';
  dueDateErrorMessage.id = 'duedate-error-message';
  addTodoForm.appendChild(dueDateErrorMessage);

  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'add-todo-form-button-container';
  addTodoForm.appendChild(buttonContainer);

  const confirmAddButton = document.createElement('button');
  confirmAddButton.textContent = 'Add';
  confirmAddButton.type = 'button';
  confirmAddButton.addEventListener('click', () => {
    const title = titleInput.value;
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    addTodoToProject(projectId, title, description, dueDate, priority);
  });
  buttonContainer.appendChild(confirmAddButton);

  const cancelAddButton = document.createElement('button');
  cancelAddButton.textContent = 'Cancel';
  cancelAddButton.type = 'button';
  cancelAddButton.addEventListener('click', () => {
    cancelAddTodoToProject(projectId);
  });

  buttonContainer.appendChild(cancelAddButton);
}

function renderProjectTodos(projectId) {
  const todoListSection = document.querySelector('#todo-list-section');
  todoListSection.innerHTML = '';

  const todoListTitle = document.createElement('h2');
  todoListTitle.textContent = app.getProjectName(projectId);
  todoListSection.appendChild(todoListTitle);

  const todoList = document.createElement('ul');
  todoList.id = 'todo-list';
  todoListSection.appendChild(todoList);

  const projectTodos = app.getProjectTodos(projectId);
  projectTodos.forEach((todo) => {
    renderTodoListItem(todo, projectId);
  });

  const addTodoButton = createAddTodoButton(projectId);
  todoListSection.appendChild(addTodoButton);
}

function renderProject(project, parent) {
  const viewProject = document.createElement('li');
  viewProject.className = 'project-list-items';
  viewProject.addEventListener('click', () => {
    renderProjectTodos(project.id);
  });

  const projectName = document.createElement('span');
  projectName.innerHTML = `<i class="fas fa-tasks"></i> ${project.name}`;
  viewProject.appendChild(projectName);

  const deleteProjectButton = document.createElement('button');
  deleteProjectButton.className = 'delete-project-buttons';
  deleteProjectButton.innerHTML = '<i class="far fa-trash-alt"></i>';
  deleteProjectButton.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteProject(project.id);
    parent.removeChild(viewProject);
  });
  viewProject.appendChild(deleteProjectButton);

  parent.appendChild(viewProject);
}

function renderSavedProjects() {
  const projectSection = document.querySelector('#project-section');
  const projectList = document.querySelector('#project-list');

  const projects = app.getStorage();
  projects.forEach((project) => {
    renderProject(project, projectList);
  });

  const addProjectButton = renderAddProjectButton();
  projectSection.appendChild(addProjectButton);
}

function renderMain() {
  const body = document.querySelector('body');
  const main = document.createElement('main');
  body.appendChild(main);

  const projectSection = document.createElement('section');
  projectSection.id = 'project-section';

  const allTodo = document.createElement('button');
  allTodo.innerHTML = '<i class="fas fa-home"></i> Home';
  allTodo.id = 'all-todo-button';
  allTodo.addEventListener('click', renderAllTodos);
  projectSection.appendChild(allTodo);

  const todayTodos = document.createElement('button');
  todayTodos.innerHTML = '<i class="far fa-calendar"></i> Today';
  todayTodos.id = 'today-todo-button';
  todayTodos.addEventListener('click', renderTodayTodos);
  projectSection.appendChild(todayTodos);

  const thisWeekTodos = document.createElement('button');
  thisWeekTodos.innerHTML = '<i class="far fa-calendar-alt"></i> This Week';
  thisWeekTodos.id = 'this-week-todo-button';
  thisWeekTodos.addEventListener('click', renderThisWeekTodos);
  projectSection.appendChild(thisWeekTodos);

  const projectListTitle = document.createElement('h2');
  projectListTitle.textContent = 'Projects';
  projectListTitle.id = 'project-list-title';
  projectSection.appendChild(projectListTitle);

  const projectList = document.createElement('ul');
  projectList.id = 'project-list';
  projectSection.appendChild(projectList);
  main.appendChild(projectSection);
  renderSavedProjects();

  const todoListSection = document.createElement('section');
  todoListSection.id = 'todo-list-section';
  main.appendChild(todoListSection);
}

function renderFooter() {
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

function renderSkeleton() {
  renderHeader();
  renderMain();
  renderFooter();
}

function cancelAddTodoToProject(projectId) {
  const todoListSection = document.querySelector('#todo-list-section');
  const addTodoForm = document.querySelector('#add-todo-form');
  todoListSection.removeChild(addTodoForm);
  const addTodoButton = createAddTodoButton(projectId);
  todoListSection.appendChild(addTodoButton);
}

function renderAddProjectButton() {
  const addProjectButton = document.createElement('button');
  addProjectButton.id = 'add-project-button';
  addProjectButton.innerHTML = '<i class="fas fa-plus-circle"></i> Add Project';
  addProjectButton.addEventListener('click', displayAddProjectForm);
  return addProjectButton;
}

function displayAddProjectForm() {
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

  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'project-form-button-container';
  addProjectForm.appendChild(buttonContainer);

  const confirmAddProjectButton = document.createElement('button');
  confirmAddProjectButton.type = 'button';
  confirmAddProjectButton.id = 'confirm-add-project-button';
  confirmAddProjectButton.textContent = 'Add';
  confirmAddProjectButton.addEventListener('click', () => {
    addProject(addProjectInput.value);
  });
  buttonContainer.appendChild(confirmAddProjectButton);

  const cancelProjectButton = document.createElement('button');
  cancelProjectButton.type = 'button';
  cancelProjectButton.id = 'cancel-add-project-button';
  cancelProjectButton.textContent = 'Cancel';
  cancelProjectButton.addEventListener('click', cancelAddProject);
  buttonContainer.appendChild(cancelProjectButton);
}

function addProject(projectName) {
  if (projectName.trim() === '') {
    const alert = document.querySelector('#alert-message');
    alert.textContent = 'Project name cannot be empty';
  } else {
    const newProject = app.addProject(projectName);
    const projectSection = document.querySelector('#project-section');
    const projectList = document.querySelector('#project-list');
    const addProjectForm = document.querySelector('#add-project-form');
    projectSection.removeChild(addProjectForm);
    renderProject(newProject, projectList);
    const addProjectButton = renderAddProjectButton();
    projectSection.appendChild(addProjectButton);
  }
}

function deleteProject(id) {
  app.deleteProject(id);
}

function cancelAddProject() {
  const addProjectForm = document.querySelector('#add-project-form');
  const projectSection = document.querySelector('#project-section');
  projectSection.removeChild(addProjectForm);

  const addProjectButton = renderAddProjectButton();
  projectSection.appendChild(addProjectButton);
}

export default renderSkeleton;
