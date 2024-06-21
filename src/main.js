import './style.css';

class TodoItem {
    constructor(title, description, dueDate, priority, notes, checklist, id = Math.floor(Math.random() * 10000)) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.id = id;
    }

    editDescription(description) {
        this.description = description;
    }

    toggleCompleted() {
        this.completed = this.completed ? false : true;
    }

    increasePriority() {
        this.priority = + 1;
    }

    decreasePriority() {
        this.priority = - 1;
    }

    isCompleted = () => !this.checklist.filter(goal => goal != 'not done');

    isDue() {
        const now = new Date().now();
        return now > this.dueDate.parse();
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            notes: this.notes,
            checklist: this.checklist,
            id: this.id
        }
    }
}

class Project {
    constructor(name, description, todoItems, sortingSetting = 'alphabet') {
        this.todoList = todoItems;
        this.name = name;
        this.description = description;

        this.sortingSetting = sortingSetting;
    }

    sort(attribute) {
        console.log('before', this.todoList);
        switch (attribute) {
            case 'priority':
                this.todoList.sort((a, b) => b.priority - a.priority);
                break;
            case 'alphabet':
                this.todoList.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
                break;
            case 'completed':
                this.todoList.sort((a, b) => +a.completed - +b.completed);
                break;
            case 'reverse':
                this.todoList.reverse();
                break;
        }
        console.log('after: ', this.todoList);
    }

    delete(id) {
        const listItemIndex = this.todoList.findIndex(item => item.id == id);
        this.todoList = [].concat(
            this.todoList.slice(0, listItemIndex),
            this.slice(listItemIndex + 1)
        );
    }

    add(todo) {
        this.todoList.push(todo);
        this.sort(this.sortingSetting);
    }

    toJSON() {
        let todoListJSON = [];
        this.todoList.forEach(todo => {
            todoListJSON.push(todo.toJSON());
        });
        let objectInformation = {
            todoList: todoListJSON,
            projectName: this.name,
            description: this.description,
            sortingSetting: this.sortingSetting
        }
        return objectInformation
    }
}

class ProjectManager {
    constructor(projects) {
        this.projects = projects;
    }

    add(project) {
        this.projects.push(project);
    }

    save() {
        let savedProjects = []
        for (let i = 0; i < this.projects.length; i++) {
            const projectJSON = this.projects[i].toJSON();
            console.log(projectJSON);
            savedProjects.push(projectJSON);
        }

        localStorage.setItem('projects', JSON.stringify(savedProjects));
        console.log(`Final save: ${savedProjects}`);
    }

    load() {
        const STORAGE_KEY = 'projects';
        const json = JSON.parse(localStorage.getItem(STORAGE_KEY));

        this.clearProjects();

        for (let i = 0; i < json.length; i++) {
            let loadedProject = this.loadProject(json[i]);
            this.add(loadedProject);
        }
    }

    loadProject(json) {
        console.log(json);
        let todoList = [];
        for (let jsonTodo in json.todoList) {
            const todo = new TodoItem(
                jsonTodo.title,
                jsonTodo.description,
                jsonTodo.dueDate,
                jsonTodo.priority,
                jsonTodo.notes,
                jsonTodo.checklist,
                jsonTodo.id
            );
            todoList.push(todo)
        }

        const project = new Project(
            json.projectName,
            json.description,
            todoList,
            json.sortingSetting
        );

        return project;
    }

    clearProjects() {
        this.projects = [];
    }
}

function createDummyProject() {
    let mowTheLawn = new TodoItem('Mow the lawn', 'Cut the grass to make the lawn look nicer', new Date(), 1, 'Make sure there are no zombies', '');
    let paintDoors = new TodoItem('Paint the doors', 'The doors could use a nice lick of paint', new Date(), 2, '', '');
    let project = new Project('Home Renovation', '', [mowTheLawn, paintDoors]);
    return project;
}
/*
function displayProjects(projectArray) {
    let element = '';
    for (project in projectArray) {
        element = toHTML(project);
    }
    document.querySelector('#project-container').appendChild(element);
}

function toHTML(project) {
    let element = document.createElement();
    element.innerHTML = `
        <h2 class="project-title">${project.name}</h2>
        <button>Hide Project</button>
        <button>Remove Project</button> 
    `;
    return element;
} */

window.createDummyProject = createDummyProject;
window.projectManager = ProjectManager;
window.TodoItem = TodoItem;
window.Project = Project;