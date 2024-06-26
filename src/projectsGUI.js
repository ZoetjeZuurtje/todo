import { dropCard, dragCard } from './components/project-card/project-card.js';

const addCardButton = document.querySelectorAll('.project-visibility-toggle');

function createCard(project) {
    
    let todoItems = '';
    for (let i = 0; i < project.todoList.length; i++) {
        todoItems = todoItems.concat(`<li>${project.todoList[i].title}</li>`);
    }

    const HTML = `
        <header>
            <button class="project-drag-button">:::::</button>
            <h2>${project.name}</h2>
        </header>
        <ul class="content">
            ${todoItems}
        </ul>
        <div class="flex flex-start">
            <button>Hide Project</button>
            <button>Remove Project</button> 
        </div>`;
    let card = document.createElement('article');
    card.classList.add('project-card', 'resizeable');
    card.setAttribute('draggable', 'true');
    card.dataset.projectId = project.id;
    card.innerHTML = HTML;

    return card;
}

function addCard(project) {
    const card = createCard(project);
    
    card.addEventListener('dragend', dropCard);
    card.addEventListener('dragstart', dragCard);

    document.querySelector('main').appendChild(card);
}

function removeCard(id) {
    const projectCards = document.querySelectorAll('main > .project-card');
    for (let i = 0; i < projectCards.length; i++) {
        if (projectCards[i].dataset.projectId == id) {
            projectCards[i].remove();
        }
    }
}

function toggleCardVisibility(event) {
    
    const projectId = event.target.parentElement.dataset.projectId;
    
    if (event.target.dataset.isHidden === 'true') {
        
        let project = window.ProjectManager.find(projectId);
        addCard(project);
        event.target.textContent = 'Hide';
    } else {
        removeCard(projectId);
        event.target.textContent = 'Show';
    }
    
    event.target.dataset.isHidden = event.target.dataset.isHidden === 'true' ? false : true;
}


addCardButton.forEach(projectElement => projectElement.addEventListener('click', toggleCardVisibility));