const main = document.querySelector('main');

const clamp = (min, value, max) => Math.max(Math.min(max, value), min);

const dropCard = (event) => {
    const cardArea = main.getBoundingClientRect();
    const card = event.target.getBoundingClientRect();

    const headerOffset = 12; // Offset the card vertically so that the mouse cursor stays on the dragButton
    const totalXOffset = cardArea.x + card.width / 2;
    const totalYOffset = cardArea.y + headerOffset;

    // Prevent the card from being dropped outside of the cardArea
    const newX = clamp(0, event.clientX - totalXOffset, cardArea.right - cardArea.x - card.width);
    const newY = clamp(0, event.clientY - totalYOffset, cardArea.bottom - cardArea.y - card.height);

    event.target.style.left = `${newX}px`;
    event.target.style.top  = `${newY}px`;
}

const dragCard = (event) => {
    const isDragButton = event.explicitOriginalTarget.parentElement.classList.contains('project-drag-button');
    if (!isDragButton) {
        event.preventDefault();
    }
}

function removeCard(event) {
    let targetElement = event.target;

    // This loop is slow
    // if performance becomes an issue, this should be changed
    while (targetElement.tagName != 'ARTICLE') {
        targetElement = targetElement.parentElement;
    }

    let projectId = targetElement.dataset.projectId;
    window.projectManagerGUI.hideCardById(projectId);
}

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
        <div class="project-card-buttons flex flex-end">
            <button class="icon dangerous-button hide-card"><span class="material-symbols-outlined">close</span></button>
        </div>`;

    let card = document.createElement('article');
    card.classList.add('project-card', 'resizeable');
    card.setAttribute('draggable', 'true');
    card.dataset.projectId = project.id;
    card.innerHTML = HTML;

    // Make the buttons function
    card.querySelector('button.hide-card').addEventListener('click', removeCard);
    return card;
}

function addCard(project) {
    const card = createCard(project);
    
    card.addEventListener('dragend', dropCard);
    card.addEventListener('dragstart', dragCard);

    main.appendChild(card);
}

const init = () => {
    // Prevent the 'return animation' of the draggable object
    document.addEventListener('dragover', function(e) { e.preventDefault() });
    let cards = document.querySelectorAll('.project-card');
    for (card of cards) {
        card.addEventListener('dragend', dropCard);
        card.addEventListener('dragstart', dragCard);
    }
};

init();

export { addCard, removeCard };