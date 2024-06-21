const main = document.querySelector('main');

const dropCard = (event) => {
    const {x, y, height, width} = main.getBoundingClientRect();
    console.log(x, y)
    const widthOffset = event.target.getBoundingClientRect().width / 2;
    const headerOffset = event.target.querySelector('.project-drag-button').getBoundingClientRect().height / 2;
    const totalXOffset = x + widthOffset;
    const totalYOffset = y + headerOffset;

    const newX = Math.max(event.clientX - totalXOffset, 0);
    const newY = Math.max(event.clientY - totalYOffset, 0);

    event.target.style.left = `${newX}px`;
    event.target.style.top  = `${newY}px`;

}

const dragCard = (event) => {
    if (event.explicitOriginalTarget.textContent != ":::::") {
        event.preventDefault();
    }
}

const init = () => {
    main.addEventListener('dragend', dropCard);
    let cards = document.querySelectorAll('.project-card');
    for (card of cards) {
        card.addEventListener('dragstart', dragCard);
    }
};

init();