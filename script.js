// Toggle theme dark/light
const ToggleBtn = document.querySelector(".btn-tgl");
ToggleBtn.addEventListener("click", (e) => {
  console.log("theme toggle clicked");
  document.body.classList.toggle("light");
});

// Todo function
const form = document.querySelector("form");
const input = document.querySelector(".todo-input");
const ul = document.querySelector(".todos-list");
const clearCompleteBtn = document.querySelector(".clear-completed");
const filterAll = document.querySelector(".filter-all");
const filterActive = document.querySelector(".filter-active");
const filterComplete = document.querySelector(".filter-completed");

// declare itemsArray by getting from localStorage or as an empty array if localStorage is empty.
console.log(ul);
let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

// Add todo
function addTodo(e) {
  e.preventDefault();
  const task = {
    id: Date.now(),
    content: input.value,
    done: false,
  };

  itemsArray.push(task);
  form.reset();
  localStorage.setItem("items", JSON.stringify(itemsArray));
  renderTasks(itemsArray);
  countItemsLeft();
}

// Render tasks
function renderTasks(itemsArray) {
  ul.innerHTML = itemsArray
    .map((item, index) => {
      return `
  <li class="todo-item">
  <input class="todo" id=${item.id} data-key=${index} type="checkbox" ${
        item.done ? "checked" : ""
      }/>
  <label class="input-text" for=${item.id} >
    ${item.content}
  </label>
  <img class="cross-icon" src="/images/icon-cross.svg" alt="" />
</li>
  `;
    })
    .join("");
}

// Toggle checked for input
function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.key;
  itemsArray[index].done = !itemsArray[index].done;

  localStorage.setItem("items", JSON.stringify(itemsArray));
  renderTasks(itemsArray);
}

// Count items left
let itemsLeft;

function countItemsLeft() {
  itemsLeft = itemsArray.filter((item) => !item.done).length;
  document.querySelector(".items-left").textContent =
    itemsLeft + `${itemsLeft.length > 0 ? " items" : " item"}` + " left";
  console.log(itemsLeft);
}

countItemsLeft();
// Delete todo, update localStorage and render updated list to screen

function deleteTask(e) {
  if (!e.target.classList.contains("cross-icon")) return;
  const elementID = e.target.parentElement.firstElementChild.getAttribute("id");
  itemsArray = itemsArray.filter((item) => {
    return item.id != elementID;
  });

  renderTasks(itemsArray);
  countItemsLeft();
}

// Clear completed
function clearCompleted(e) {
  itemsArray = itemsArray.filter((item) => {
    return !item.done;
  });
  renderTasks(itemsArray);
}

// filter active
function filterActiveTasks() {
  console.log("filter active");
  itemsArray = JSON.parse(localStorage.getItem("items"));
  itemsArray = itemsArray.filter((item) => {
    return !item.done;
  });
  renderTasks(itemsArray);
}

// filter completed
function filterCompletedTasks() {
  console.log("filter complete");
  itemsArray = JSON.parse(localStorage.getItem("items"));
  itemsArray = itemsArray.filter((item) => {
    return item.done;
  });
  renderTasks(itemsArray);
}

// filter all
function filterAllTasks() {
  itemsArray = JSON.parse(localStorage.getItem("items"));
  console.log("filter all");
  renderTasks(itemsArray);
}

// Event listeners
form.addEventListener("submit", addTodo);
// listen to 'click' event on the whole ul
ul.addEventListener("click", toggleDone);
ul.addEventListener("click", deleteTask);
clearCompleteBtn.addEventListener("click", clearCompleted);
renderTasks(itemsArray);
filterActive.addEventListener("click", filterActiveTasks);
filterComplete.addEventListener("click", filterCompletedTasks);
filterAll.addEventListener("click", filterAllTasks);
console.log(filterAll);
