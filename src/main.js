import ProjectManager from './projectManager.js';
import ProjectManagerGUI from './projectsGUI.js';
import './style.css';
require('./components/project-card/project-card.js');
require('./components/sidebar-item/sidebar-item.js');
require('./projectsGUI.js');
require('./todo.js');
require('./projectManager.js');
require('./project.js');

let pm = new ProjectManager();
let _ = new ProjectManagerGUI(pm);