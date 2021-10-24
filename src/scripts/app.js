import { isToday, isThisWeek } from 'date-fns';
import Project from './project';
import Todo from './todo';

const app = (function () {
  let storage = [];
  const localStorageKey = 'todo-list';

  function setDefaultStorage() {
    const defaultProject = new Project('Default');
    storage.push(defaultProject);
  }

  if (localStorage.getItem(localStorageKey)) {
    storage = JSON.parse(localStorage.getItem(localStorageKey));
  } else {
    setDefaultStorage();
    localStorage.setItem(localStorageKey, JSON.stringify(storage));
  }

  function getStorage() {
    return storage;
  }

  function addProject(projectName) {
    const newProject = new Project(projectName);
    storage.push(newProject);
    localStorage.setItem(localStorageKey, JSON.stringify(storage));
    return newProject;
  }

  function addTodoToProject(projectId, title, description, dueDate, priority) {
    const newTodo = new Todo(title, description, dueDate, priority);
    const project = storage.find((p) => p.id === projectId);
    project.todos.push(newTodo);
    localStorage.setItem(localStorageKey, JSON.stringify(storage));
    return newTodo;
  }

  function deleteTodo(todoId, projectId) {
    const project = storage.find((p) => projectId === p.id);
    project.todos = project.todos.filter((todo) => todo.id !== todoId);
    localStorage.setItem(localStorageKey, JSON.stringify(storage));
  }

  function doneTodo(todoId, projectId) {
    const project = storage.find((p) => p.id === projectId);
    const todo = project.todos.find((t) => t.id === todoId);
    todo.done = !todo.done;
    localStorage.setItem(localStorageKey, JSON.stringify(storage));
  }

  function editTodo(todoId, projectId, title, description, dueDate, priority) {
    const project = storage.find((p) => p.id === projectId);
    const editedTodo = project.todos.find((todo) => todo.id === todoId);
    editedTodo.title = title;
    editedTodo.description = description;
    editedTodo.dueDate = dueDate;
    editedTodo.priority = priority;
    localStorage.setItem(localStorageKey, JSON.stringify(storage));
  }

  function deleteProject(projectId) {
    storage = storage.filter((p) => p.id !== projectId);
    localStorage.setItem(localStorageKey, JSON.stringify(storage));
  }

  function getProjectTodos(projectId) {
    const selectedProject = storage.find((p) => p.id === projectId);
    return selectedProject.todos;
  }

  function getAllTodos() {
    const todoArray = [];
    storage.forEach((project) => {
      project.todos.forEach((todo) => {
        todoArray.push({ todo, projectId: project.id });
      });
    });
    return todoArray;
  }

  function getTodayTodos() {
    let todoArray = getAllTodos();
    todoArray = todoArray.filter((item) => isToday(new Date(item.todo.dueDate)));
    return todoArray;
  }

  function getThisWeekTodos() {
    let thisWeekTodos = getAllTodos();
    thisWeekTodos = thisWeekTodos.filter((item) => isThisWeek(new Date(item.todo.dueDate)));
    return thisWeekTodos;
  }

  function getProjectName(projectId) {
    const project = storage.find((p) => p.id === projectId);
    return project.name;
  }

  return {
    getStorage,
    addProject,
    deleteProject,
    getProjectTodos,
    addTodoToProject,
    deleteTodo,
    editTodo,
    doneTodo,
    getAllTodos,
    getTodayTodos,
    getThisWeekTodos,
    getProjectName,
  };
}());

export default app;
