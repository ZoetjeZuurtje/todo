import { addCard } from './components/project-card/project-card.js';
import { addProjectElement } from './components/sidebar-item/sidebar-item.js';


class ProjectManagerGUI {
    constructor(projectManager) {
        this.projectManager = projectManager;
        
        this.setup();
    }

    hideCardById(id) {
        const projectCards = document.querySelectorAll('main > .project-card');
        const project = projectCards.filter(element => element.dataset.projectId == id);
        project[0].remove();
    }

    toggleCardVisibility = (event) => {

        const toggleButton = event.target;
        
        const projectId = toggleButton.parentElement.dataset.projectId;
        
        if (toggleButton.dataset.isHidden === 'true') {
            console.log(this.projectManager);
            const project = this.projectManager.find(projectId);
            addCard(project);
            toggleButton.textContent = 'Hide';
        } else {
            this.hideCardById(projectId);
            toggleButton.textContent = 'Show';
        }
        
        this.toggleDataIsHidden(toggleButton);
    }

    removeProject(event) {
        let id = event.parentElement.dataset.projectId;

        this.projectManager.removeProject(id);
        this.displayProjects();
    }

    displayProjects() {
        const projectContainer = document.querySelector('#project-container');
        let documentFragment = new DocumentFragment();

        for (project in this.projectManager.projects) {
            
        }
    }
    
    toggleDataIsHidden(element) {
        element.dataset.isHidden = element.dataset.isHidden === 'true' ? false : true;
    }

    loadProjects() {
        const projectContainer = document.querySelector('#project-container');
        let documentFragment = new DocumentFragment();

        for (let i = 0; i < this.projectManager.projects.length; i++) {
            const project = this.projectManager.projects[i];
            let projectElement = addProjectElement(project);
            documentFragment.appendChild(projectElement);
        }

        const addCardButtons = document.querySelectorAll('.project-visibility-toggle');
        const deleteProjectButtons = document.querySelectorAll('.project-delete-button');

        addCardButtons.forEach(projectElement => projectElement.addEventListener('click', this.toggleCardVisibility));
        deleteProjectButtons.forEach(button => button.addEventListener('click', this.removeProject));

        projectContainer.appendChild(documentFragment);
    }
    
    setup() {
        this.loadProjects();

        const addCardButtons = document.querySelectorAll('.project-visibility-toggle');
        const deleteProjectButtons = document.querySelectorAll('.project-delete-button');

        addCardButtons.forEach(projectElement => projectElement.addEventListener('click', this.toggleCardVisibility));
        deleteProjectButtons.forEach(button => button.addEventListener('click', this.removeProject));
    }
}

export default ProjectManagerGUI;