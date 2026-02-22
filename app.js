const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearDoneBtn = document.getElementById("clearDoneBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const totalCount = document.getElementById("totalCount");
const doneCount = document.getElementById("doneCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// SAVE to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// UPDATE counters
function updateStats() {
    totalCount.textContent = "Total: " + tasks.length;
    doneCount.textContent =
        "Done: " + tasks.filter(t => t.done).length;
}

// DISPLAY tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.done) li.classList.add("done");

        const span = document.createElement("span");
        span.textContent = task.text;

        // toggle done
        span.onclick = () => {
            tasks[index].done = !tasks[index].done;
            saveTasks();
            renderTasks();
        };

        const delBtn = document.createElement("button");
        delBtn.textContent = "✖";
        delBtn.className = "deleteBtn";

        delBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });

    updateStats();
}

// ADD task
addBtn.onclick = () => {
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({ text, done: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
};

// press ENTER to add
taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addBtn.click();
});

// CLEAR done tasks
clearDoneBtn.onclick = () => {
    tasks = tasks.filter(task => !task.done);
    saveTasks();
    renderTasks();
};

// CLEAR all tasks
clearAllBtn.onclick = () => {
    if (confirm("Delete all tasks?")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
};

// load tasks when page opens
renderTasks();
