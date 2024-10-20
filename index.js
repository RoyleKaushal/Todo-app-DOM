function loadToDos () {
    const data = JSON.parse(localStorage.getItem('toDos')) || {list:[]};
    console.log(data);
    return data;
}

function addToLocalStorage (newToDo) {
    const todos = loadToDos();
    todos.list.push(newToDo);
    let res = JSON.stringify(todos);
    localStorage.setItem('toDos', res);
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
            addToLocalStorage(data);
            todoInput.value="";
        }
    })
    loadToDos();
})