var btn = document.getElementById("todobtn");
btn.addEventListener('click', function (event) {
    event.preventDefault();
});

var loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
var todoItems = JSON.parse(localStorage.getItem("todoList")) || [];
// var uniqueTodoId = todoItems[todoItems.length - 1].todoID;
var uniqueTodoId = todoItems.length + 10;
var userId = loggedUser.userId;
var filterUserTodoItems = todoItems.filter(function (item) {
    return item.userId == userId;
})

var todoItems = {
    userId,
    todoID: ++uniqueTodoId,
    title,
    description,
    priority,
    dateCreated
}


function greetUserOnDashboard() {
    document.getElementById("showname").innerHTML = "Hello " + loggedUser.username.toUpperCase() + " !";
}

greetUserOnDashboard();

function showItemForm() {
    var addTodoItems = document.getElementById("todoInputs");
    addTodoItems.classList.remove("d-none");
}

function createItemRow(filterUserTodoItemslength, title, description, priority, dateCreated) {
    var table = document.getElementById("tableitems");
    var tableRow = table.appendChild(document.createElement("tr"));
    // tableRow.appendChild(document.createElement("th")).textContent = filterUserTodoItemslength;
    // tableRow.appendChild(document.createElement("td")).textContent = title;
    // tableRow.appendChild(document.createElement("td")).textContent = description;
    // tableRow.appendChild(document.createElement("td")).textContent = priority;
    // tableRow.appendChild(document.createElement("td")).textContent = dateCreated;

    tableRow.innerHTML =
        "<th>" + filterUserTodoItemslength + "</th>" +
        "<td>" + title + "</td>" +
        "<td>" + description + "</td>" +
        "<td>" + priority + "</td>" +
        "<td>" + dateCreated + "</td>" +
        "<td>" + "<button class='btn btn-danger' id='delete-todo' onclick='deleteTodo()' >Delete</button>" + "</td>"


}

function deleteAllItems() {
    var filterUserTodoItems = todoItems.filter(function (item) {
        return item.userId == userId;
    })
    if (filterUserTodoItems.length > 0) {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete all the todo items!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                ).then(function () {
                    todoItems = todoItems.filter(function (item) {
                        return item.userId !== userId;
                    });
                    localStorage.setItem("todoList", JSON.stringify(todoItems));
                    filterUserTodoItems = [];
                    clearHTMLtable();
                })
            }

        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'No items to delete'
        })
    }
}

function clearHTMLtable() {
    var table = document.getElementById("tableitems")
    table.innerHTML = "";
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

        todoItems.push(todoItems);

        var filterUserTodoItems = todoItems.filter(function (item) {
            return item.userId == userId
        })
        localStorage.setItem("todoList", JSON.stringify(todoItems));
        Swal.fire({
            icon: 'success',
            title: 'Item added !',
        })
        createItemRow(filterUserTodoItems.length, title, description, priority, dateCreated);
        clearInputs();
        addTodoItems.classList.add("d-none");
    }
    console.log("filterUserTodoItems :", filterUserTodoItems);
}


if (filterUserTodoItems.length > 0) {
    for (var i = 0; i < filterUserTodoItems.length; i++) {
        var table = document.getElementById("tableitems");
        var tableRow = table.appendChild(document.createElement("tr"));
        // tableRow.appendChild(document.createElement("th")).textContent = i + 1;
        // tableRow.appendChild(document.createElement("td")).textContent = filterUserTodoItems[i].title;
        // tableRow.appendChild(document.createElement("td")).textContent = filterUserTodoItems[i].description;
        // tableRow.appendChild(document.createElement("td")).textContent = filterUserTodoItems[i].priority;
        // tableRow.appendChild(document.createElement("td")).textContent = filterUserTodoItems[i].dateCreated;

        tableRow.innerHTML =
            "<th>" + (i + 1) + "</th>" +
            "<td>" + filterUserTodoItems[i].title + "</td>" +
            "<td>" + filterUserTodoItems[i].description + "</td>" +
            "<td>" + filterUserTodoItems[i].priority + "</td>" +
            "<td>" + filterUserTodoItems[i].dateCreated + "</td>" +
            "<td >" + "<button class='btn btn-danger' id='delete-todo' onclick='deleteTodo()' >Delete</button>" + "</td>"

    }
}



function clearInputs() {
    document.getElementById("inputTitle4").value = "";
    document.getElementById("inputDescription4").value = "";
}

function deleteTodo(todoID) {
    Swal.fire({
        title: 'Are you sure?',
        text: "This will delete the selected todo item!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Find the index of the todo item with the given todoID
            const index = todoItems.findIndex(item => item.todoID === todoID);

            if (index !== -1) {
                // Remove the todo item from the array
                todoItems.splice(index, 1);

                // Update local storage
                localStorage.setItem("todoList", JSON.stringify(todoItems));

                // Remove the corresponding table row from the HTML
                const table = document.getElementById("tableitems");
                const rowToRemove = document.querySelector(`tr[data-todoID="${todoID}"]`);

                if (rowToRemove) {
                    table.removeChild(rowToRemove);
                }

                Swal.fire(
                    'Deleted!',
                    'The todo item has been deleted.',
                    'success'
                );
            }
        }
    });
}

