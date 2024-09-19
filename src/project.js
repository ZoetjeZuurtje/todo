class Project {
    constructor(name, description, todoItems, sortingSetting = 'priority') {
        let id = Math.floor(Math.random() * 1E6);

        this.todoList = todoItems;
        this.name = name;
        this.description = description;
        this.id = id;

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

export default Project;