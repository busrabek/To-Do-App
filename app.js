//variables
const todoList = []

const eachTask = document.querySelector("#eachTask");
const enterTask = document.querySelector("#enterTask");
const addButton = document.querySelector("#addButton");

enterTask.focus();
DisplayTodos();

//add event listeners
addButton.addEventListener("click", () => {
    console.log("TODO: ", enterTask.value);
    AddTodo(enterTask.value);
});


enterTask.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) addButton.click();
});


//functions
function IDCreator() {
    let randomID;
    do {
        randomID = Math.floor(Math.random() * 10000);
    } while (todoList.includes(randomID))
    return randomID;
}


function AddTodo(string) {
    const todoObject = {
        id: IDCreator(),
        todoText: string,
        isDone: false
    }

    todoList.push(todoObject);

    enterTask.value = "";

    DisplayTodos();
}

function DoneTodo(todoID) {
    const selectedTodoIndex = todoList.findIndex(item => item.id == todoID);
    todoList[selectedTodoIndex].isDone = !todoList[selectedTodoIndex].isDone;
    DisplayTodos();
}

function DeleteTodo(todoID) {
    const selectedTodoIndex = todoList.findIndex(item => item.id == todoID)
    todoList.splice(selectedTodoIndex, 1);
    DisplayTodos();
}




function DisplayTodos() {
    eachTask.innerHTML = "";

    todoList.forEach((item) => {
        const listElement = document.createElement("li");
        listElement.setAttribute("data-id", item.id)

        if (item.isDone) {
            listElement.classList.add("checked")
        }

        const checkElement = document.createElement("i");
        checkElement.classList.add("fa");
        checkElement.classList.add("fa-check");
        checkElement.classList.add("fa-lg");
        checkElement.addEventListener("click", (e) => {
            const selectedID = e.target.parentElement.getAttribute("data-id");
            DoneTodo(selectedID);
        })


        listElement.appendChild(checkElement);

        const textElement = document.createElement("p");
        textElement.innerText = item.todoText;
        textElement.addEventListener("click", (e) => {
            const selectedID = e.target.parentElement.getAttribute("data-id");
            DoneTodo(selectedID);
        })
        listElement.appendChild(textElement);

        const deleteElement = document.createElement("i");
        deleteElement.classList.add("fa");
        deleteElement.classList.add("fa-trash");
        deleteElement.classList.add("fa-lg");
        deleteElement.style.color = "black";

        deleteElement.addEventListener("click", (e) => {
            const selectedID = e.target.parentElement.getAttribute("data-id");
            DeleteTodo(selectedID);
        })

        listElement.appendChild(deleteElement);



        eachTask.appendChild(listElement);

        enterTask.focus();


    })

   
}