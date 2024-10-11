import Project from '../../project';
import TodoItem from '../../todoItem';


function generateTodoList(elements) {
    const array = Array.prototype.slice.call(elements);
    console.log(array);
    let todoList = array.map(element => {
        let name = element.querySelector('input[type="text"]').value;
        let deadline = element.querySelector('input[type="date"]').value;
        let priority = element.querySelector('button.priority').dataset.priority;
        let desc = element.querySelector('details textarea').value;
        

        name = name ? name : 'Unnamed Task';
        desc = desc ? desc : 'No Description Set';
        // deadline = new Date(deadline);

        return new TodoItem(name, desc, deadline, priority);
    });

    return todoList;
}

function getProjectFromDialog() {
    const projectTitle = document.querySelector('#add-project-dialog .project-name').value;
    const description = document.querySelector('#add-project-dialog .project-description').value;
    const todosContainer = document.querySelector('#add-project-dialog .project-todos');
    const todoList = generateTodoList(todosContainer.children);

    let project = new Project(projectTitle, description, todoList);

    return project;
}

export default getProjectFromDialog;