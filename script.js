/* Your code here */
let Todo = { TodoList: [], DoneList: [] }

const loadFromStorage = () => {
    if (localStorage.Todo) {
        todo = JSON.parse(localStorage.todo)
    }

    document.getElementById("todoList").innerHTML = ""
    document.getElementById("doneList").innerHTML = ""
    let lastTodoList
    let lastdoneList
    for (let id in Todo.TodoList) {
        lastTodoList = loadTodoList(Todo.TodoList[id], id)
    }
    for (let id in Todo.DoneList) {
        lastdoneList = loaddoneList(Todo.DoneList[id])
    }
    return { lastdoneList, lastTodoList }
}

const saveToStorage = () => {
    localStorage.Todo = JSON.stringify(Todo)
}


document.getElementById("inputdata")
    .addEventListener("keyup", function(e) {
    e.preventDefault();
    if (e.key === "Enter") {
        addlist()
    }
})

const addlist = () =>{
    const input = document.querySelector("input")
    if (input.value === "") {
        alert("Task cannot be empty")
    }
    else{

    Todo.TodoList.push(currentinput)
    loadTodoList(Todo.TodoList[Todo.TodoList.length - 1], Todo.TodoList.length - 1)
    saveToStorage()
    }
    input.value = ""
}
const loadTodoList = (input, id) => {
    const todoList = document.createElement("div")
    const titlelist = document.createElement("div")
    const button = document.createElement("div")
    const doneBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")
    doneBtn.innerHTML = "Done"
    deleteBtn.innerHTML = "Delete"
    todoList.classList.add("flex","justify-between","h-16","px-4","py-2")
    titlelist.classList.add("text-xl")
    button.classList.add("flex","space-x-4")
    doneBtn.classList.add("invisible","hover:bg-blue-500","bg-white","px-2","transform","duration-500")
    deleteBtn.classList.add("invisible","hover:bg-gray-500","bg-white","px-2","transform","duration-500")
    doneBtn.addEventListener("click", () => {
        deleteBtn.disabled = true
        doneBtn.disabled = true
            todoList.remove()
            Todo.TodoList.splice(id, 1)
            Todo.DoneList.push(input)
            saveToStorage()
            const temp = loadFromStorage()

             temp.lastdoneList.classList.remove("opacity-0")

    })
    deleteBtn.addEventListener("click", () => {
        deleteBtn.disabled = true
        doneBtn.disabled = true
            todoList.remove()
            Todo.TodoList.splice(id, 1) 
            saveToStorage()
            loadFromStorage()
    })
    todoList.addEventListener("mouseenter", () => {
        doneBtn.classList.replace("invisible", "visible")
        deleteBtn.classList.replace("invisible", "visible")
        doneBtn.classList.remove("opacity-0")
        deleteBtn.classList.remove("opacity-0")
    })
    todoList.addEventListener("mouseleave", () => {
        doneBtn.classList.replace("visible", "invisible")
        deleteBtn.classList.replace("visible", "invisible")
        doneBtn.classList.add("opacity-0")
        deleteBtn.classList.add("opacity-0")
    })
    titlelist.innerHTML = input
    button.append(doneBtn)
    button.append(deleteBtn)
    todoList.append(titlelist)
    todoList.append(button)
    document.getElementById("todoList").prepend(todoList)
}

const loaddoneList = (input) => {
    const doneLists = document.getElementById("doneList")
    const newmember = document.createElement("div")
    const title = document.createElement("div")
    newmember.classList.add("flex","h-14","px-4","py-2")
    title.classList.add("text-xl","self-center")
    title.innerHTML = input
    title.style.textDecoration = "line-through"
    newmember.append(title)
    doneLists.prepend(newmember)
}

const smoothclear = () => {
    localStorage.clear()
    location.reload()
}

const addinput = (ai) =>{
    currentinput = ai.target.value
}


loadFromStorage()
