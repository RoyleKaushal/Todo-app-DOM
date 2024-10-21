function loadToDos () {
    const data = JSON.parse(localStorage.getItem('toDos')) || {list:[]};
    console.log(data);
    return data;
}

function addToLocalStorage (newToDo) {
    const todos = loadToDos();
    todos.list.push({ text : newToDo, isCompleted : false });
    let res = JSON.stringify(todos);
    localStorage.setItem('toDos', res);
}

function appendToDoInHtml (todoText) {
    const todoList = document.getElementById('todo-list');
    const element = document.createElement('li');
    element.textContent = todoText;
    todoList.appendChild(element);
}

document.addEventListener('DOMContentLoaded',()=>{
    console.log('Dom loaded');
    const todoInput = document.getElementById("new-todo");
    todoInput.addEventListener("change",(data)=>{
        console.log("DATA===>",data.target.value);
        const val = data.target.value;
        data.target.value = val.trim();
    });
    const submitButton = document.getElementById("add-btn");
    submitButton.addEventListener("click",()=>{
        const data = todoInput.value.trim();
        if(data=== ''){
            alert("Please write something here");
        }else {
            appendToDoInHtml(data)
            addToLocalStorage(data);
            todoInput.value="";
        }
    });

    const filterButton = document.getElementsByClassName('filterButton');
    console.log(filterButton.item)
    Array.from(filterButton).forEach((data)=> {
        data.addEventListener('click',(event)=>{
            const element = event.target;
            const value = element.getAttribute("data-filter");
            const todoList = document.getElementById('todo-list');
            let dt = loadToDos();
            todoList.innerHTML = '';
            if ( value == 'all' ){
                dt?.list?.forEach((todoText)=>{
                    console.log(todoText)
                    appendToDoInHtml(todoText.text);
                });
            }else if ( value == 'pending' ){
                dt?.list?.forEach((todoText)=>{
                    if(!todoText.isCompleted)
                        appendToDoInHtml(todoText.text);
                });
            }else {
                dt?.list?.forEach((todoText)=>{
                    if(todoText.isCompleted)
                        appendToDoInHtml(todoText.text);
                });
            }
        });
    })
    let dt = loadToDos();
    dt?.list?.forEach((todoText)=>{
        console.log(todoText)
        appendToDoInHtml(todoText.text);
    });
})