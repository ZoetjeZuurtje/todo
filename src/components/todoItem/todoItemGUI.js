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

function returnSidebar() {
  let sidebar = document.createElement('div')
  let removeButton = document.createElement('button');
  let priorityBar = document.createElement('button');
  
  sidebar.classList.add('todo-item-sidebar');
  removeButton.classList.add('dangerous-button', 'remove');
  removeButton.innerText = 'x';
  removeButton.addEventListener('click', removeTodoElement);
  priorityBar.classList.add('priority', 'low-priority');
  priorityBar.dataset.priority = 'low';
  priorityBar.addEventListener('click', changePriority);

  sidebar.appendChild(removeButton);
  sidebar.appendChild(priorityBar);

  return sidebar;
}

function returnContent() {
  let content = document.createElement('div');
  content.classList.add('todo-item-content');

  let titleAndDate = document.createElement('div');
  let title = document.createElement('input');
  let date = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('placeholder', 'Placeholder Title');
  date.setAttribute('type', 'date');
  titleAndDate.appendChild(title);
  titleAndDate.appendChild(date);

  let details = document.createElement('details');
  details.classList.add('todo-description');
  let summary = document.createElement('summary');
  let textarea = document.createElement('textarea');
  summary.innerText = 'Enter your description below';
  textarea.setAttribute('cols', 30);
  textarea.setAttribute('rows', 10);
  details.appendChild(summary);
  details.appendChild(textarea);

  content.appendChild(titleAndDate);
  content.appendChild(details);

  return content;
}

function returnTodoElement() {
  let frag = new DocumentFragment();
  let sidebar = returnSidebar();
  let content = returnContent();

  let wrapper = document.createElement('div');
  wrapper.classList.add('todo-item');
  wrapper.append(content, sidebar);

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