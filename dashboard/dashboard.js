var btn = document.getElementById("todobtn");
btn.addEventListener('click', function (event) {
    event.preventDefault();
});
var loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
function greetUserOnDashboard() {
    document.getElementById("showname").innerHTML = "Hello " + loggedUser.username + " !";
}
greetUserOnDashboard();


function showItemForm() {
    var addTodoItems = document.getElementById("todoInputs");
    addTodoItems.classList.remove("d-none");
}
var todoItems = JSON.parse(localStorage.getItem("todoList")) || [];
var uniqueTodoId = todoItems.length + 10;



var userId = loggedUser.userId;

var filterUserTodoItems = todoItems.filter(function (item) {
    return item.userId == userId
})



function addItem(filterUserTodoItemslength, title, description, priority, dateCreated) {
    var table = document.getElementById("tableitems");
    var tableRow = table.appendChild(document.createElement("tr"));
    tableRow.appendChild(document.createElement("th")).textContent = filterUserTodoItemslength + 1;
    tableRow.appendChild(document.createElement("td")).textContent = title;
    tableRow.appendChild(document.createElement("td")).textContent = description;
    tableRow.appendChild(document.createElement("td")).textContent = priority;
    tableRow.appendChild(document.createElement("td")).textContent = dateCreated;
}



function addTodoItem() {
    var title = document.getElementById("inputTitle4").value;
    var description = document.getElementById("inputDescription4").value;
    var priority = document.getElementById("inputPriority").value;
    var addTodoItems = document.getElementById("todoInputs");
    var dateCreated = new Date().toLocaleString();
    if (!(title && description)) {
        Swal.fire({
            icon: 'warning',
            title: 'Input field required',
            text: 'Please Enter input field',
        })
    }
    else {
        todoItems.push({
            userId,
            todoID: ++uniqueTodoId,
            title,
            description,
            priority,
            dateCreated
        })
        localStorage.setItem("todoList", JSON.stringify(todoItems));
        Swal.fire({
            icon: 'success',
            title: 'Item added !',
        })
        addItem(filterUserTodoItems.length, title, description, priority, dateCreated);
        clearInputs();
        addTodoItems.classList.add("d-none");
    }


    console.log("filterUserTodoItems :", filterUserTodoItems);
}


for (var i = 0; i < filterUserTodoItems.length; i++) {
    var table = document.getElementById("tableitems");
    var tableRow = table.appendChild(document.createElement("tr"));
    tableRow.appendChild(document.createElement("th")).textContent = i + 1;
    tableRow.appendChild(document.createElement("td")).textContent = filterUserTodoItems[i].title;
    tableRow.appendChild(document.createElement("td")).textContent = filterUserTodoItems[i].description;
    tableRow.appendChild(document.createElement("td")).textContent = filterUserTodoItems[i].priority;
    tableRow.appendChild(document.createElement("td")).textContent = filterUserTodoItems[i].dateCreated;
}



function clearInputs() {
    document.getElementById("inputTitle4").value = "";
    document.getElementById("inputDescription4").value = "";
}