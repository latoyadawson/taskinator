//DOM Elements
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//
//function for creating a task, adding it to to-do list, adding text, and styling it
var taskFormHandler = function(event) {
    event.preventDefault ();
    var taskNameInput = document.querySelector("input[name= 'task-name']").value;
    var taskTypeInput = document.querySelector("select[name= 'task-type']").value;
   
    //package up data as an object 
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an arguement to createTaskEl
    createTaskEl(taskDataObj);
    
}

//create a new task HTML element
var createTaskEl = function(taskDataObj) {
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task info and add to list 
    var taskInfoEl = document.createElement("div");
    //give it a class 
    taskInfoEl.className = "task-info";
    //add HTML content to div 
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl)

    //add entire list item to the list 
    tasksToDoEl.appendChild(listItemEl);
}

//expressions for click event
formEl.addEventListener("submit", taskFormHandler);