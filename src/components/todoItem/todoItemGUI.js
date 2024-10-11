const priorityButtons = document.querySelectorAll('.priority');

function changePriority(event) {
  let button = event.target;
  let priority = button.dataset.priority;
  let priorityMap = {
    'low': 'medium',
    'medium': 'high',
    'high': 'low'
  }
  
  button.classList.remove('low-priority', 'medium-priority', 'high-priority');
  button.classList.add(`${priorityMap[priority]}-priority`);
  button.dataset.priority = priorityMap[priority];
}

function removeTodoElement(event) {
  let currentElement = event.target;

  while (!currentElement.classList.contains('todo-item')) {
    currentElement = currentElement.parentElement;
  }

  currentElement.remove();
}

function returnPriorityBar() {
  let priorityBar = document.createElement('button');
  priorityBar.classList.add('priority', 'low-priority');
  priorityBar.dataset.priority = 'low';
  priorityBar.addEventListener('click', changePriority);

  return priorityBar;
}

function returnContent() {
  let content = document.createElement('div');
  content.classList.add('todo-item-content');


  let removeButton = document.createElement('button');
  removeButton.classList.add('dangerous-button', 'remove');
  removeButton.innerText = '🗑';
  removeButton.addEventListener('click', removeTodoElement);
  

  let contentHeader = document.createElement('div');
  let title = document.createElement('input');
  let date = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('placeholder', 'Placeholder Title');
  date.setAttribute('type', 'date');
  contentHeader.appendChild(title);
  contentHeader.appendChild(date);
  contentHeader.appendChild(removeButton);

  let details = document.createElement('details');
  details.classList.add('todo-description');
  let summary = document.createElement('summary');
  let textarea = document.createElement('textarea');
  summary.innerText = 'Enter your description below';
  textarea.setAttribute('cols', 30);
  textarea.setAttribute('rows', 10);
  details.appendChild(summary);
  details.appendChild(textarea);

  content.appendChild(contentHeader);
  content.appendChild(details);

  return content;
}

function returnTodoElement() {
  let frag = new DocumentFragment();
  let priorityBar = returnPriorityBar();
  let content = returnContent();

  let wrapper = document.createElement('div');
  wrapper.classList.add('todo-item');
  wrapper.append(content, priorityBar);

  frag.appendChild(wrapper);

  return frag;
}

function addTodoElement() {
  const todoList = document.querySelector('#add-project-dialog .project-todos');

  todoList.appendChild(returnTodoElement());

  // Give focus to the title, so that the user is prompted to immediately enter one.
  todoList.lastChild.querySelector('input[type="text"]').focus();
}

function setup() {
  document.querySelector('#add-todo-btn').addEventListener('click', addTodoElement);
}

setup();