

// connect with our elements in html

let lightBtn = document.getElementById("BrightDark");
let darkBtn = document.getElementById("DarkBright");
let field = document.querySelector(".container");
let input = document.querySelector(".content");
let inputBtn = document.querySelector(".taskBtn");
let tasks = document.querySelector(".bottom-section");

// dark mode && bright mode

lightBtn.addEventListener("click", function (event) {
  if (event.target.tagName == "I") {
    this.classList.toggle("dark");
    darkBtn.classList.toggle("dark");
    darkMode();
  }
});
darkBtn.addEventListener("click", function (e) {
  if (e.target.tagName == "IMG") {
    this.classList.toggle("dark");
    lightBtn.classList.toggle("dark");
    brightMode();
  }
});

function darkMode() {
  field.style.backgroundColor = "#242424";
  document.querySelector(".container h1").style.color = "white";
}
function brightMode() {
  field.style.backgroundColor = "#f7f7f7";
  document.querySelector(".container h1").style.color = "rgb(39, 39, 39)";
}

///////////////////////////////////////////////////////////////////////////////////  
  
let array = [];

input.addEventListener("keypress", (press) => {
  if(press.key == "Enter") {
      arrayData();
      input.value= "";
  }
})


if (localStorage.getItem("input")) {
  array = JSON.parse(localStorage.getItem("input"));
}
getStorage();

inputBtn.addEventListener('click', function() {
    if(input.value !== "") {
      arrayData();
      input.value= "";
    }
});

function arrayData() {
  const data = {
    id: new Date().getTime(),
    value: input.value,
    completed: false,
  };
  array.push(data);
  addLocal(array);
  getStorage();
};
            
// create Elements
function addElements(elementData) {
  tasks.innerHTML = "";
  elementData.forEach((ele) => {
    //container
    let div = document.createElement("div");
    div.classList = "task";
    div.setAttribute("completed", ele.completed);
    div.setAttribute("id", ele.id);
    //image
    let image = document.createElement("img");
    image.classList = 'checkIcon';
    image.setAttribute("id", ele.id);
    if (ele.completed) {
      image.setAttribute("src", "images/checkIconTrue.png");
      div.classList.add("done");
    } else {
      image.setAttribute("src", "images/checkIconFalse.png");
    }
    //paragraph
    let para = document.createElement("p");
    para.setAttribute("id", ele.id);
    para.textContent = ele.value;
    //deleteBtn
    let deleteBtn = document.createElement("img");
    deleteBtn.classList = "deleteBtn";
    deleteBtn.setAttribute("src", "images/remove.png");
    //month and year and day
    let span = document.createElement("span");
    span.classList = "month-year";
    let getday = new Date(ele.id).getDate();
    let getMonth = new Date(ele.id).getMonth() + 1;
    let getYear = new Date(ele.id).getFullYear();
    let getHour = new Date(ele.id).getHours();
    let getminutes =
      new Date(ele.id).getMinutes() < 10
        ? `0${new Date(ele.id).getMinutes()}`
        : new Date(ele.id).getMinutes();
    span.textContent =
      getday +
      "/" +
      getMonth +
      "/" +
      getYear +
      " at " +
      getHour +
      ":" +
      getminutes;
    div.appendChild(image);
    div.appendChild(para);
    div.appendChild(span);
    div.appendChild(deleteBtn);
    tasks.appendChild(div);
  });
}

      

function addLocal(arr) {
  window.localStorage.setItem("input", JSON.stringify(arr));
}

function getStorage() {
  let getFromStorage = window.localStorage.getItem("input");
  if (getFromStorage) {
    let tasky = JSON.parse(getFromStorage)
    addElements(tasky);
  }

}

tasks.addEventListener('click', (eventClick) => {
  if (eventClick.target.classList.contains("deleteBtn")) {
    array = array.filter((e) => e.id != eventClick.target.parentElement.getAttribute("id"));
    addLocal(array);
    eventClick.target.parentElement.remove();
    }
  if (
    eventClick.target.classList.contains("checkIcon") ||
    eventClick.target.classList.contains("task") ||
    eventClick.target.tagName == "P" 
  ) {
    togglee(eventClick.target.getAttribute("id"));
  }
  getStorage();
}); 


function togglee(a) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == a) {
      array[i].completed == false
        ? (array[i].completed = true)
        : (array[i].completed = false);
    }
  }
  addLocal(array);
}
