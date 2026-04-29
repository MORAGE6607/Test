const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const itemsLeft = document.getElementById('items-left');

// 1. Load tasks from localStorage or start with empty array
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// 2. Initial Render
renderTasks();

// 3. Add Task Function
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        completed: false
    };
    tasks.push(newTask);
    saveAndRender();
    taskInput.value = '';
});

// 4. Delete Task Function
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

// 5. Save to LocalStorage and Update UI
function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}

// 6. Render tasks to the screen
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
    itemsLeft.innerText = `${tasks.length} items total`;
}

// Set the date
document.getElementById('date-display').innerText = new Date().toDateString();
