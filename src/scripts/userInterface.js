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

export {
    renderSkeleton
}