// ===== DOM Elements =====
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskPriority = document.getElementById('task-priority');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const taskCountEl = document.getElementById('task-count');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// ===== State =====
let tasks = [];
let currentFilter = 'all';

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    render();
});

// ===== Event Listeners =====
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render();
    });
});

// ===== Task Functions =====

/**
 * Add a new task from the input field
 */
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const task = {
        id: Date.now(),
        text: text,
        priority: taskPriority.value,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.unshift(task);
    saveTasks();
    render();

    taskInput.value = '';
    taskInput.focus();
}

/**
 * Toggle a task's completed status
 */
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        render();
    }
}

/**
 * Delete a task by its ID
 */
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
}

/**
 * Clear all completed tasks
 */
function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    render();
}

// ===== Rendering =====

/**
 * Render the task list based on current filter
 */
function render() {
    const filtered = getFilteredTasks();

    // Update task list HTML
    if (filtered.length === 0) {
        taskList.innerHTML = '';
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        taskList.innerHTML = filtered.map(task => createTaskHTML(task)).join('');
    }

    // Update remaining count
    const remaining = tasks.filter(t => !t.completed).length;
    taskCountEl.textContent = remaining;
}

/**
 * Get tasks based on the active filter
 */
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

/**
 * Generate HTML for a single task item
 */
function createTaskHTML(task) {
    return `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''} 
                onclick="toggleTask(${task.id})"
            >
            <span class="task-text">${escapeHTML(task.text)}</span>
            <span class="priority-badge ${task.priority}">${task.priority}</span>
            <button class="btn btn-delete" onclick="deleteTask(${task.id})" title="Delete task">
                🗑️
            </button>
        </li>
    `;
}

// ===== Storage =====

/**
 * Save tasks to localStorage
 */
function saveTasks() {
    localStorage.setItem('taskTracker_tasks', JSON.stringify(tasks));
}

/**
 * Load tasks from localStorage
 */
function loadTasks() {
    const stored = localStorage.getItem('taskTracker_tasks');
    if (stored) {
        tasks = JSON.parse(stored);
    }
}

// ===== Utilities =====

/**
 * Escape HTML to prevent XSS
 */
function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
let a = 10;
let b = 20;
console.log(a + b);