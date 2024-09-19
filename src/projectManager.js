import TodoItem from "./todo";
import Project from "./project";


class ProjectManager {
    constructor(...projects) {
        if (projects.length < 1) {
            this.load();
        } else {
            for (project in projects) {
                this.projects.push(project);
            }
        }
    }

    find(id) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].id == id) {
                return this.projects[i];
            }
        }
        throw new Error('Project not found');
    }

    add(project) {
        this.projects.push(project);
        
        this.save();
    }

    remove(id) {
        const index = this.getIndex(id);
        if (index === false) return;

        const firstHalf = this.projects.splice(0, index);
        const secondHalf = this.projects.splice(index + 1);
        
        this.projects = [].concat(firstHalf, secondHalf);
        
        this.save();
    }

    getIndex(id) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].id == id) {
                return i;
            }
        }
        return false;
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
        if (json === null) return;

        this.clearProjects();

        for (let i = 0; i < json.length; i++) {
            let loadedProject = this.loadProject(json[i]);
            this.add(loadedProject);
        }
    }

    loadProject(json) {
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

export default ProjectManager;