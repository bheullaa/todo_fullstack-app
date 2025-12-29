const API_URL = "http://localhost:5000/api/todos";

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// Fetch and display todos on load
window.onload = fetchTodos;

// GET todos
async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();
  renderTodos(todos);
}

// Render todos
function renderTodos(todos) {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";

    li.innerHTML = `
      <div class="todo-left">
        <input type="checkbox" ${todo.completed ? "checked" : ""}
          onchange="toggleTodo('${todo._id}', this.checked)">
        <span>${todo.text}</span>
      </div>
      <div class="actions">
        <button class="edit-btn" onclick="editTodo('${todo._id}', '${todo.text}')">✏️</button>
        <button class="delete-btn" onclick="deleteTodo('${todo._id}')">❌</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

// ADD todo
async function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  todoInput.value = "";
  fetchTodos();
}

// DELETE todo
async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  fetchTodos();
}

// TOGGLE completed
async function toggleTodo(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });

  fetchTodos();
}

// EDIT todo
async function editTodo(id, oldText) {
  const newText = prompt("Edit your todo:", oldText);
  if (!newText) return;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: newText }),
  });

  fetchTodos();
}
