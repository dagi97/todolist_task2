let todo:string[] = JSON.parse(localStorage.getItem("todo") || "[]");
const addbtn = document.querySelector(".btn") as HTMLButtonElement;
const todoinput = document.querySelector("input") as HTMLInputElement;
const todolist  = document.querySelector(".todoList") as HTMLElement;
const editbtn = document.getElementById("edit") as HTMLButtonElement;
let Eindex:number | null = null;
 
document.addEventListener("DOMContentLoaded", function(){
    addbtn.addEventListener("click", addtask);
    todoinput.addEventListener("keydown",(e: KeyboardEvent)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            addtask();
        }
    })

    
    displaytask();
    

})

function addtask(): void {
    const newtask = todoinput.value;
    if (newtask){
        todo.push(newtask);
        savetolocal();
        todoinput.value = "";
        displaytask()
    }

}
function displaytask(): void {
    todolist.innerHTML = "";

    todo.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        const input = document.createElement("input");
        input.type = "text";
        input.value = task;
        input.disabled = true;
        input.className = "inputt"
        li.appendChild(input);

        
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        let isEditing = false;

        editBtn.addEventListener("click", () => {
            if (!isEditing) {
                input.disabled = false;
                input.focus();
                editBtn.textContent = "Save";
                isEditing = true;
            } else {
                todo[index] = input.value;
                savetolocal();
                displaytask(); 
            }
        });

        li.appendChild(editBtn);

    
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => {
            deletetask(index);
        });
        li.appendChild(deleteBtn);

        todolist.appendChild(li);
    });
}

function savetolocal():void{
    localStorage.setItem("todo", JSON.stringify(todo));

}
function deletetask(index:number):void{
    todo.splice(index, 1);
    savetolocal();
    displaytask();
}
