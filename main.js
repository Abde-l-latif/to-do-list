

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
    id: new Date(),
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
    //deleteBtn
    let deleteBtn = document.createElement("img");
    deleteBtn.classList = "deleteBtn";
    deleteBtn.setAttribute("src", "images/remove.png");
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

function togglee(a) {
  for (i = 0; i < array.length; i++) {
    if (array[i].id == a) {
      array[i].completed == false
        ? (array[i].completed = true)
        : (array[i].completed = false);
    }
  }
  addLocal(array);
}


tasks.addEventListener('click',function (ex) {
  if (ex.target.classList == "deleteBtn") {
    array = array.filter((e) => e.id != ex.target.parentElement.getAttribute("id"));
    addLocal(array);
    ex.target.parentElement.remove();
    }
  if (
    ex.target.tagName == "IMG" ||
    ex.target.classList.contains("task") ||
    ex.target.tagName == "P"
  ) {
    togglee(ex.target.getAttribute("id"));
  }
  getStorage();
}); 
