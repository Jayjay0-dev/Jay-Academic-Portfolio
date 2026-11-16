// =================================
// ACADEMIC PLANNER
// =================================

// 1. Select HTML elements
const taskInput = document.getElementById("task-input");
const deadlineInput = document.getElementById("task-deadline");
const addTaskButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// 2. Store academic tasks
let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];

// 3. Save tasks to browser storage
function saveTasks() {
    localStorage.setItem("academicTasks", JSON.stringify(tasks));
}

// 4. Display tasks
function displayTasks() {

    // Remove previously displayed tasks
    taskList.querySelectorAll(".task-item").forEach(item => {
        item.remove();
    });

    // Show or hide the empty message
    const emptyMessage = document.getElementById("empty-message");

    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";

    // Display each task
    tasks.forEach((task) => {

        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        const description = document.createElement("span");
        description.textContent = task.description;

        const deadline = document.createElement("span");
        deadline.textContent = task.deadline;

        
// Add completed styling if the task is finished
taskItem.classList.toggle("completed", task.completed);

// Create action buttons
const actions = document.createElement("div");

// Complete button
const completeButton = document.createElement("button");
completeButton.textContent = task.completed ? "Undo" : "Complete";
completeButton.type = "button";

completeButton.addEventListener("click", () => {
    task.completed = !task.completed;
    saveTasks();
    displayTasks();
});

// Delete button
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.type = "button";

deleteButton.addEventListener("click", () => {
    tasks = tasks.filter(item => item.id !== task.id);
    saveTasks();
    displayTasks();
});

// Put everything together
actions.appendChild(completeButton);
actions.appendChild(deleteButton);

taskItem.appendChild(description);
taskItem.appendChild(deadline);
taskItem.appendChild(actions);

taskList.appendChild(taskItem);
 


// 5. Add a new task
function addTask() {
    const description = taskInput.value.trim();
    const deadline = deadlineInput.value;

    if (description === "" || deadline === "") {
        alert("Please enter a task and deadline.");
        return;
    }

    const newTask = {
        id: Date.now(),
        description: description,
        deadline: deadline,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    deadlineInput.value = "";
}

// 6. Listen for button clicks
addTaskButton.addEventListener("click", addTask);

// 7. Display saved tasks when page loads
displayTasks();