//DOM Elements
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

//array variable 
var tasks = [];


//event for adding items to list
var taskFormHandler = function(event) {
    event.preventDefault ();
    var taskNameInput = document.querySelector("input[name= 'task-name']").value;
    var taskTypeInput = document.querySelector("select[name= 'task-type']").value;
   
      //check if input values are empty strings
      if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task from!");
        return false;
    }

    //reset task name form 
    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");

    //has data attribute, so get task id and call function to complete edit process 
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //no data attribute, so create object as noraml and pass to createTaskEl function
    else {
        var taskDataObj = {
            //package up data as an object v
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        //send it as an arguement to createTaskEl
        createTaskEl(taskDataObj);
    }
};

//create a new task HTML element
var createTaskEl = function(taskDataObj) {
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //add task id as a custom attribute 
    listItemEl.setAttribute("data-task-id" , taskIdCounter);

    //create div to hold task info and add to list 
    var taskInfoEl = document.createElement("div");
    //give it a class 
    taskInfoEl.className = "task-info";
    //add HTML content to div 
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl)

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //add entire list item to the list 
    tasksToDoEl.appendChild(listItemEl);


    // have tasks object include id and push the id into tasks aray
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    saveTasks();

    //increase task count for next unique id 
    taskIdCounter++;
};

//task actions
var createTaskActions = function(taskId) {
    //create a new div 
    var actionContainerEl = document.createElement("div")
    actionContainerEl.className = "task-actions";
    
    // create edit button expressions
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    // create delete button expression
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    //drop down  change status expression
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    //create status options
    var statusChoices = ["To Do" , "In Progress" , "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

//edit a task  function 
var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through tasks array ans task object with new content 
    for (var i = 0; i<tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task Updated!");

    //reset form
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    // save to localStorage
    saveTasks();
};


//status change for tasks
var taskStatusChangeHandler = function(event) {
   //get the task based on item's id 
   var taskId = event.target.getAttribute("data-task-id");

   //get currrently selected option's value andc over to lowercase
   var statusValue = event.target.value.toLowerCase();

   //find the parent task item element based on the id 
   var taskSelected = document.querySelector(".task-item[data-task-id='" +taskId + "']");

   if (statusValue === "to do") {
       tasksToDoEl.appendChild(taskSelected);
   } 
   else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
   }
   else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
   }

   //update task's in tasks array
   for (var i = 0; i < tasks.length; i++){
       if (tasks[i].id === parseInt(taskId)){
           tasks[i].status = statusValue;
       }
   }
   //save to localStorage
   saveTasks();
};

//function for task button handler (event delegation)
var taskButtonHandler = function(event) {
    //get target element from event
    var targetEl = event.target;
   
    //edit button was clicked
    if(targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delte button was clicked
    else if (targetEl.matches(".delete-btn")) {
        //get element's task id 
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

//edit task function
var editTask = function(taskId) {
    //get task list item element 
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type 
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
   
    //expressions 
    document.querySelector("input[name= 'task-name']").value;
    document.querySelector("select[name= 'task-type']").value;

    // set data attribute to the form with a value of the task's id so it knows which one is being edited
    formEl.setAttribute("data-task-id" , taskId);

    //update form's button to reflect editing a task rather than creating a new one
    formEl.querySelector("#save-task").textContent = "Save Task";
};

//delete task function 
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create a new array to hold updated list of tasks 
    var updatedTaskArr = [];

    //loope through current tasks 
    for (var i = 0; i < tasks.length; i++){
        //if tasks[i].id doest mate the value of task id ,let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks();
};

//function to save task in local storage 
var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//gets tasks from local storage 
var loadTasks = function (){
    // get tasks items from local stroage
    var savedTasks = localStorage.getItem('tasks');

    if (!savedTasks) {
        tasks = [];
        return false;
    }
    //Converts tasks from the string format back into an array of objects.
    savedTasks = JSON.parse(tasks);
   
    

    //Iterates through a tasks array and creates task elements on the page from it.

    for (var i = 0; i < savedTasks.length; i++) {
        // pass each task object into the `createTaskEl()` function
        createTaskEl(savedTasks[i]);
    }
}

loadTasks();
// event listenter
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);