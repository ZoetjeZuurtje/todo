import ProjectManager from './projectManager.js';
import ProjectManagerGUI from './projectsGUI.js';
import './style.css';
require('./components/project-card/project-card.js');
require('./components/sidebar-item/sidebar-item.js');
require('./components/todoItem/todoItemGUI.js');
require('./projectsGUI.js');
require('./projectManager.js');
require('./project.js');

let pm = new ProjectManager();
window.projectManagerGUI = new ProjectManagerGUI(pm);