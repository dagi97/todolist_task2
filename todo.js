var todo = JSON.parse(localStorage.getItem("todo") || "[]");
var addbtn = document.querySelector(".btn");
var todoinput = document.querySelector("input");
var todolist = document.querySelector(".todoList");
var editbtn = document.getElementById("edit");
var Eindex = null;
document.addEventListener("DOMContentLoaded", function () {
    addbtn.addEventListener("click", addtask);
    todoinput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            addtask();
        }
    });
    displaytask();
});
function addtask() {
    var newtask = todoinput.value;
    if (newtask) {
        todo.push(newtask);
        savetolocal();
        todoinput.value = "";
        displaytask();
    }
}
function displaytask() {
    todolist.innerHTML = "";
    todo.forEach(function (task, index) {
        var li = document.createElement("li");
        li.className = "task-item";
        var input = document.createElement("input");
        input.type = "text";
        input.value = task;
        input.disabled = true;
        input.className = "inputt";
        li.appendChild(input);
        var editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        var isEditing = false;
        editBtn.addEventListener("click", function () {
            if (!isEditing) {
                input.disabled = false;
                input.focus();
                editBtn.textContent = "Save";
                isEditing = true;
            }
            else {
                todo[index] = input.value;
                savetolocal();
                displaytask();
            }
        });
        li.appendChild(editBtn);
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", function () {
            deletetask(index);
        });
        li.appendChild(deleteBtn);
        todolist.appendChild(li);
    });
}
function savetolocal() {
    localStorage.setItem("todo", JSON.stringify(todo));
}
function deletetask(index) {
    todo.splice(index, 1);
    savetolocal();
    displaytask();
}
