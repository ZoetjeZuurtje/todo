const main = document.querySelector('main');

const clamp = (min, value, max) => Math.max(Math.min(max, value), min);

const dropCard = (event) => {
    const cardArea = main.getBoundingClientRect();

    const {height: cardHeight, width: cardWidth} = event.target.getBoundingClientRect();
    const headerOffset = event.target.querySelector('.project-drag-button').getBoundingClientRect().height / 2;
    const totalXOffset = cardArea.x + cardWidth / 2;
    const totalYOffset = cardArea.y + headerOffset;

    // Prevent the card from being dropped to the left or above the `main` element
    const newX = clamp(0, event.clientX - totalXOffset, cardArea.right - cardWidth - cardArea.x);
    const newY = clamp(0, event.clientY - totalYOffset, cardArea.bottom - cardHeight - cardArea.y);
    // Prevent the card from being dropped under or to the right of the `main` element
    event.target.style.left = `${newX}px`;
    event.target.style.top  = `${newY}px`;
}

const dragCard = (event) => {
    const isDragButton = event.explicitOriginalTarget.parentElement.classList.contains('project-drag-button');
    if (!isDragButton) {
        event.preventDefault();
    }
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