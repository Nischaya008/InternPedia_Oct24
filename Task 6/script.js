document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const pendingTasks = document.getElementById('pendingTasks');
    const completedTasks = document.getElementById('completedTasks');

    let taskCounter = 1;

    // Load tasks from localStorage
    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    function addTask(taskText, isCompleted = false) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-content">
                <span class="task-handle"><i class="fas fa-grip-vertical"></i></span>
                <span class="task-number">${taskCounter}. </span>
                <span class="task-text">${taskText}</span>
            </div>
            <div class="task-buttons">
                ${isCompleted ? '' : '<button class="complete">Complete</button>'}
                <button class="edit">${isCompleted ? 'Undo' : 'Edit'}</button>
                <button class="delete">Delete</button>
            </div>
        `;

        if (isCompleted) {
            li.classList.add('completed');
            completedTasks.appendChild(li);
        } else {
            pendingTasks.appendChild(li);
        }

        li.querySelector('.delete').addEventListener('click', () => deleteTask(li));

        if (isCompleted) {
            li.querySelector('.edit').addEventListener('click', () => undoTask(li));
        } else {
            li.querySelector('.complete').addEventListener('click', () => markAsCompleted(li));
            li.querySelector('.edit').addEventListener('click', () => editTask(li));
        }

        taskCounter++;
        updateTaskNumbers();
        saveTasks();
    }

    function markAsCompleted(li) {
        completedTasks.appendChild(li);
        li.classList.add('completed');
        li.querySelector('.complete').remove();
        li.querySelector('.edit').textContent = 'Undo';
        li.querySelector('.edit').removeEventListener('click', () => editTask(li));
        li.querySelector('.edit').addEventListener('click', () => undoTask(li));
        updateTaskNumbers();
        saveTasks();
    }

    function undoTask(li) {
        pendingTasks.appendChild(li);
        li.classList.remove('completed');
        li.querySelector('.edit').textContent = 'Edit';
        li.querySelector('.edit').removeEventListener('click', () => undoTask(li));
        li.querySelector('.edit').addEventListener('click', () => editTask(li));
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete');
        completeButton.addEventListener('click', () => markAsCompleted(li));
        li.querySelector('.task-buttons').prepend(completeButton);
        updateTaskNumbers();
        saveTasks();
    }

    function editTask(li) {
        const taskText = li.querySelector('.task-text');
        const newTaskText = prompt('Edit your task:', taskText.textContent);
        if (newTaskText) {
            taskText.textContent = newTaskText;
            saveTasks();
        }
    }

    function deleteTask(li) {
        li.remove();
        updateTaskNumbers();
        saveTasks();
    }

    function updateTaskNumbers() {
        const pendingItems = pendingTasks.querySelectorAll('li');
        pendingItems.forEach((item, index) => {
            item.querySelector('.task-number').textContent = `${index + 1}. `;
        });
        taskCounter = pendingItems.length + 1;
    }

    function saveTasks() {
        const pendingTasksData = Array.from(pendingTasks.querySelectorAll('li')).map(li => ({
            text: li.querySelector('.task-text').textContent,
            completed: false
        }));

        const completedTasksData = Array.from(completedTasks.querySelectorAll('li')).map(li => ({
            text: li.querySelector('.task-text').textContent,
            completed: true
        }));

        localStorage.setItem('tasks', JSON.stringify([...pendingTasksData, ...completedTasksData]));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => addTask(task.text, task.completed));
    }

    // Initialize Sortable for drag and drop functionality
    new Sortable(pendingTasks, {
        animation: 150,
        handle: '.task-handle',
        onEnd: () => {
            updateTaskNumbers();
            saveTasks();
        }
    });

    new Sortable(completedTasks, {
        animation: 150,
        handle: '.task-handle',
        onEnd: saveTasks
    });

    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check if dark mode preference is saved in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});
