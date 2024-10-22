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
  console.log("Here");
  const todosList = document.getElementById("todo-list");
  console.log(todosList);
  todosList.innerHTML = "";
  let newList = { list: [] };
  todos.list.forEach((todo) => {
    newList.list.push({
      text: todo.text,
      isCompleted: todo.isCompleted,
      id: todo.id,
    });
    appendToDoInHtml(todo.text, todo.id, todo.isCompleted);
  });
  localStorage.setItem("toDos", JSON.stringify(newList));
  const completedBtns = document.getElementsByClassName("complete-btn");
  const deleteBtns = document.getElementsByClassName("delete-btn");

  Array.from(completedBtns).forEach((btn) => {
    btn.addEventListener("click", completeTodo);
  });
  Array.from(deleteBtns).forEach((btn) => {
    btn.addEventListener("click", deleteTodo);
  });

}

function completeTodo(event) {
  console.log("Here");
  const todoItem = event.target.parentElement.parentElement;
  const todoId = todoItem.getAttribute("data-item");
  const todos = loadToDos();

  todos.list.forEach((it) => {
    if (it.id == todoId) {
      it.isCompleted = !it.isCompleted;
    }
  });
  refreshTodos(todos);
  console.log("Hi======>", todos.list);
}

function deleteTodo(event) {
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-item");
    const todos = loadToDos();

    console.log("Here",todoItem,todoId,todos);

  
    let newList = todos.list.filter((it) => {
        console.log(it.id,todoId)
      if (it.id == todoId) {
        return false;
      }
      return true;
    });
    // console.log("Hi======>", newList);
    refreshTodos({list:newList});
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
      appendToDoInHtml(data, list.list.length, false);
      addToLocalStorage(data);
      todoInput.value = "";
    }
  });

  const filterButton = document.getElementsByClassName("filterButton");
  const completedBtns = document.getElementsByClassName("complete-btn");
  const deleteBtns = document.getElementsByClassName("delete-btn");


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
    });
  });
  let dt = loadToDos();
  dt?.list?.forEach((todoText) => {
    appendToDoInHtml(todoText.text, todoText.id, todoText.isCompleted);
  });
  Array.from(completedBtns).forEach((btn) => {
    btn.addEventListener("click", completeTodo);
  });
  Array.from(deleteBtns).forEach((btn) => {
    btn.addEventListener("click", deleteTodo);
  });
});
