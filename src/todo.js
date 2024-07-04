
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

export default TodoItem;