import { addCard } from './components/project-card/project-card.js';
import { addProjectElement } from './components/sidebar-item/sidebar-item.js';
import getProjectFromDialog from './components/dialog/dialog.js';


class ProjectManagerGUI {
    constructor(projectManager) {
        this.projectManager = projectManager;
        this.setup();
    }

    hideCardById(id) {
        const project = document.querySelector(`article[data-project-id="${id}"]`);
        if (project === null) return;
        project.remove();

        let toggleBtn = document.querySelector(`div[data-project-id="${id}"] .project-visibility-toggle`);
        toggleBtn.textContent = toggleBtn.textContent == 'Show' ? 'Hide' : 'Show';
        this.toggleDataIsHidden(toggleBtn);
    }

    addProject(project) {
        const projectContainer = document.querySelector('#project-container');
        this.projectManager.add(project);
        let element = addProjectElement(project);

        element
            .querySelector('.project-visibility-toggle')
            .addEventListener('click', this.toggleCardVisibility);
        element
            .querySelector('.project-delete-button')
            .addEventListener('click', this.removeProject);

        projectContainer.appendChild(element);
    }

    toggleCardVisibility = (event) => {

        const toggleButton = event.target;
        
        const projectId = toggleButton.parentElement.dataset.projectId;
        
        if (toggleButton.dataset.isHidden === 'true') {
            const project = this.projectManager.find(projectId);
            addCard(project);
            toggleButton.textContent = 'Hide';
            this.toggleDataIsHidden(toggleButton);
        } else {
            this.hideCardById(projectId);
        }        
    }

    removeProject = (event) => {
        let id = event.target.parentElement.dataset.projectId;
        let projectElement = document.querySelector(`div[data-project-id="${id}"]`); // Project in the sidebar

        this.projectManager.remove(+id);
        this.hideCardById(id);
        projectElement.remove();
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

    getModalData() {
        const modal = document.querySelector('#add-project-dialog');
        const name = modal.querySelector('.project-name').value;
        const desc = modal.querySelector('.project-description').value;
        const todos = modal.querySelectorAll('.project-todos .todo');

        console.log(`
            name: ${name},
            description: ${desc},
            todo items: ${todos}
            `);
            console.log(todos);
    }
    
    setup() {
        this.loadProjects();
        
        const modalCancelButton = document.querySelector('dialog .cancel');
        const modalConfirmButton = document.querySelector('dialog .confirm');
        const modalShowDialogButton = document.querySelector('#add-project-button');
        const addProjectDialog = document.querySelector('#add-project-dialog');
        const addCardButtons = document.querySelectorAll('.project-visibility-toggle');
        const deleteProjectButtons = document.querySelectorAll('.project-delete-button');
        const dialogConfirmButton = document.querySelector('dialog button.confirm');

        addCardButtons.forEach(projectElement => projectElement.addEventListener('click', this.toggleCardVisibility));
        deleteProjectButtons.forEach(button => button.addEventListener('click', this.removeProject));
        modalShowDialogButton.addEventListener('click', () => { addProjectDialog.showModal() });
        modalCancelButton.addEventListener('click', () => { addProjectDialog.close() });
        modalConfirmButton.addEventListener('click', this.getModalData);
        dialogConfirmButton.addEventListener('click', event => {
            let project = getProjectFromDialog(event);
            this.addProject(project);
            addProjectDialog.close();
        });
    }
}

export default ProjectManagerGUI;