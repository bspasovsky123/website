let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const searchInput = document.getElementById("searchInput");
const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function renderTasks() {
  const filtered = tasks.filter(task => {
    const matchSearch = task.text.toLowerCase().includes(searchInput.value.toLowerCase());

    if (currentFilter === "active") return !task.completed && matchSearch;
    if (currentFilter === "completed") return task.completed && matchSearch;
    return matchSearch;
  });

  taskList.innerHTML = "";

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    span.onclick = () => toggleTask(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Удалить";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

renderTasks();