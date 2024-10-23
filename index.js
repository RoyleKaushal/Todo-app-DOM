function loadToDos() {
  const data = JSON.parse(localStorage.getItem("toDos")) || { list: [] };
  return data;
}

function addToLocalStorage(newToDo) {
  const todos = loadToDos();
  todos.list.push({ text: newToDo, isCompleted: false, id: todos.list.length });
  let res = JSON.stringify(todos);
  localStorage.setItem("toDos", res);
}

function refreshTodos(todos) {
  const todosList = document.getElementById("todo-list");
  todosList.innerHTML = "";
  let newList = { list: [] };
  todos.list.forEach((todo, index) => {
    newList.list.push({
      text: todo.text,
      isCompleted: todo.isCompleted,
      id: index,
    });
    appendToDoInHtml(todo.text, todo.id, todo.isCompleted);
  });
  localStorage.setItem("toDos", JSON.stringify(newList));
  refreshButtons();
}

function refreshButtons() {
  const completedBtns = document.getElementsByClassName("complete-btn");
  const deleteBtns = document.getElementsByClassName("delete-btn");
  const editBtns = document.getElementsByClassName("edit-btn");

  Array.from(completedBtns).forEach((btn) => {
    btn.addEventListener("click", completeTodo);
  });
  Array.from(deleteBtns).forEach((btn) => {
    btn.addEventListener("click", deleteTodo);
  });
  Array.from(editBtns).forEach((btn) => {
    btn.addEventListener("click", editTodo);
  });
}

function completeTodo(event) {
  const todoItem = event.target.parentElement.parentElement;
  const todoId = todoItem.getAttribute("data-item");
  const todos = loadToDos();

  todos.list.forEach((it) => {
    if (it.id == todoId) {
      it.isCompleted = !it.isCompleted;
    }
  });
  refreshTodos(todos);
}

function deleteTodo(event) {
  const todoItem = event.target.parentElement.parentElement;
  const todoId = todoItem.getAttribute("data-item");
  const todos = loadToDos();

  let newList = todos.list.filter((it) => {
    if (it.id == todoId) {
      return false;
    }
    return true;
  });
  refreshTodos({ list: newList });
}

function editTodo(event) {
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-item");
    const todos = loadToDos();
    const text = prompt("Enter updated text");
    console.log("here1")
    if (!text) {
      return
    }
    console.log("Kaushal");
    let newList = todos.list.map((it) => {
      if (it.id == todoId) {
        return {
          id: it.id,
          text: text,
          isCompleted: it.isCompleted,
        };
      } else {
        return it;
      }
    });
    console.log("here")
    refreshTodos({ list: newList });
}

function appendToDoInHtml(todoText, idx, isCompleted) {
  const todoList = document.getElementById("todo-list");
  const element = document.createElement("li");
  const wrapper = document.createElement("div");
  wrapper.classList.add("list-item");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = isCompleted ? "Reset" : "Complete";
  completeBtn.classList.add("complete-btn");
  if (isCompleted) {
    element.classList.add("completed");
  }

  element.setAttribute("data-item", idx);
  element.textContent = todoText;
  todoList.appendChild(element);
  element.appendChild(wrapper);
  wrapper.appendChild(editBtn);
  wrapper.appendChild(deleteBtn);
  wrapper.appendChild(completeBtn);
}

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("new-todo");
  todoInput.addEventListener("change", (data) => {
    const val = data.target.value;
    data.target.value = val.trim();
  });
  const submitButton = document.getElementById("add-btn");
  submitButton.addEventListener("click", () => {
    const data = todoInput.value.trim();
    if (data === "") {
      alert("Please write something here");
    } else {
      let list = loadToDos();
      list.list.push({ text: data, id: list.list.length, isCompleted: false });
      refreshTodos(list);
      todoInput.value = "";
    }
  });

  const filterButton = document.getElementsByClassName("filterButton");

  Array.from(filterButton).forEach((data) => {
    data.addEventListener("click", (event) => {
      const element = event.target;
      const value = element.getAttribute("data-filter");
      const todoList = document.getElementById("todo-list");
      let dt = loadToDos();
      todoList.innerHTML = "";
      if (value == "all") {
        dt?.list?.forEach((todoText) => {
          appendToDoInHtml(todoText.text, todoText.id, todoText.isCompleted);
        });
      } else if (value == "pending") {
        dt?.list?.forEach((todoText) => {
          if (!todoText.isCompleted) {
            appendToDoInHtml(todoText.text, todoText.id, todoText.isCompleted);
          }
        });
      } else {
        dt?.list?.forEach((todoText) => {
          if (todoText.isCompleted) {
            appendToDoInHtml(todoText.text, todoText.id, todoText.isCompleted);
          }
        });
      }
      refreshButtons();
    });
  });
  let dt = loadToDos();
  dt?.list?.forEach((todoText) => {
    appendToDoInHtml(todoText.text, todoText.id, todoText.isCompleted);
  });
  refreshButtons();
});
