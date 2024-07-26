function addProjectElement(project) {
    const element = document.createElement('div');
    element.classList.add('project');
    element.dataset.projectId = project.id;
    
    const title = document.createElement('h2');
    title.textContent = project.name;

    const visibilityToggle = createVisibilityToggle();
    const deleteProjectButton = createProjectDeleteButton();

    element.appendChild(title);
    element.appendChild(visibilityToggle);
    element.appendChild(deleteProjectButton);

    return element;
}

function createVisibilityToggle() {
    const button = document.createElement('button');
    button.classList.add('project-visibility-toggle');
    button.dataset.isHidden = true;
    button.textContent = 'Show';
    return button;
}

function createProjectDeleteButton() {
    const button = document.createElement('button');
    button.classList.add('project-delete-button');
    button.textContent = 'Remove';
    return button;
}

export { addProjectElement }