import { addCard, removeCard } from './components/project-card/project-card.js';

const addCardButton = document.querySelectorAll('.project-visibility-toggle');

function removeCardById(id) {
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