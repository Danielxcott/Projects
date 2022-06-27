const input = document.querySelector(".todo-input");
const submit = document.querySelector(".todo-btn");
const list = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

submit.addEventListener("click", addLists);
list.addEventListener("click", checking);
filterOption.addEventListener("change", filterTodo);
window.addEventListener("load", getStorage);

function addLists(e) {
  e.preventDefault();
  let txt = input.value;
  if (txt === "") {
    alert("should need to put a text in the box");
  } else {
    showList(txt);
    checkStorage(txt);
  }
  input.value = "";
}

function showList(txt) {
  console.log(txt);
  const div = document.createElement("div");
  const div1 = document.createElement("div");
  const li = document.createElement("li");
  const del = document.createElement("button");
  const check = document.createElement("button");
  div.setAttribute("class", "todo animate__animated animate__slideInRight");
  li.classList.add("todo-item");
  li.innerText = txt;
  check.innerHTML = '<i class="fas fa-check"></i>';
  check.classList.add("check-btn");
  del.innerHTML = '<i class="fas fa-trash"></i>';
  del.classList.add("del-btn");
  div.appendChild(li);
  div1.append(check, del);
  div1.classList.add("click-item");
  div.appendChild(div1);
  list.appendChild(div);
}

function checking(e) {
  const item = e.target;
  /*For delete */
  if (item.classList[0] === "del-btn") {
    const parent = item.parentElement;
    const main = parent.parentElement;
    main.setAttribute("class", "animate__animated animate__zoomOut");
    setTimeout(() => {
      main.remove();
      removeStorage(main);
    }, 400);
  }
  /*For checking */
  if (item.classList[0] === "check-btn") {
    const parent = item.parentElement;
    const main = parent.parentElement;
    main.classList.add("complete");
  }
}

function filterTodo(e) {
  const todo = list.childNodes;
  todo.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "grid";
        break;
      case "complete":
        if (item.classList.contains("complete")) {
          item.style.display = "grid";
        } else {
          item.style.display = "none";
        }
        break;
      case "uncomplete":
        if (!item.classList.contains("complete")) {
          item.style.display = "grid";
        } else {
          item.style.display = "none";
        }
    }
  });
}

/*Local Storage */
function checkStorage(txt) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(txt);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    showList(todo);
  });
}

function removeStorage(item) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todoIndex = item.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
