//DOM Elements
var formEl = document.querySelector("#task-form");
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");


//function for creating a task, adding it to to-do list, adding text, and styling it
var createTaskHandler = (event) => {

    event.preventDefault ();
    
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
}

//expressions for click event
formEl.addEventListener("submit", createTaskHandler);