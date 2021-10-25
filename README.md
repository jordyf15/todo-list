# Todo-list
A project for The Odin Project's Javascript Course, where we have to build a todo list application.  
Below are the assignments of the projects:  
1. The ‘todos’ are going to be objects that we’ll want to dynamically create, which means either using factories or constructors/classes to generate them.
2. At a minimum the ‘todos’ should have a title, description, dueDate and priority. We might also want to include notes or even a checklist.
3. The todo list should have projects or separate lists of todos. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into.
4. We should separate our application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.
5. The todo list should be able to do the following:
    - view all projects
    - view all todos in each project (probably just the title and duedate.. perhaps changing color for different priorities)
    - expand a single todo to see/edit its details
    - delete a todo
6. Use localStorage to save user’s projects and todos between sessions.

## Live Demo
https://todo-list.jordyf15.repl.co/

## Installation and Usage
Input the following command one-by-one to the terminal.
```
    git clone https://github.com/jordyf15/todo-list.git
    cd todo-list
    npm i

    // To run build for production
    npm run build
    // Put the index.html in the dist folder to a browser or use a live server
    
    // To serve for development
    npm run serve
    //the server should be on localhost:8080
```
