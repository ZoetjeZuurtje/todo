
class TodoItem {
    constructor(title, description, dueDate, priority, id = Math.floor(Math.random() * 10000)) {
        this.title = title; // string
        this.description = description; /// string
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id; // int
    }

    editDescription(description) {
        this.description = description;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    increasePriority() {
        this.priority += 1;
    }

    decreasePriority() {
        this.priority -= 1;
    }

    // isCompleted = () => !this.checklist.filter(goal => goal != 'not done');

    isCompleted = () => this.checklist.every(item => item == 'done');

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
            id: this.id
        }
    }
}

export default TodoItem;