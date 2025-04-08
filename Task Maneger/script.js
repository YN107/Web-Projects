let tasks = [];

let inpt = document.querySelector(".main");
let box = document.querySelector(".box");

function addTask() {
  if (inpt.value.trim() == "") {
    inpt.placeholder = "مدخل خاطئ";
    inpt.value = "";
    setTimeout(function () {
      inpt.placeholder = "مهمة جديدة";
    }, 2000);
  } else {
    tasks.push(inpt.value);
    box.innerHTML += `
    <div class="allTasks">
      <div class="delC">
          <input class="Checked" type="checkbox" onchange="CH(this)">
          <h3>${inpt.value}</h3>
      </div>
      <button onclick="delF(this)" class="del">Delete</button>
    </div>
  `;
    box.style.alignItems = "flex-start";
    inpt.value = "";
  }
}

function delF(button) {
  let taskDiv = button.parentElement;
  taskDiv.remove();
  tasks.pop();
}

function CH(button) {
  let taskDiv = button.parentElement;
  taskDiv.querySelector("h3").style.color = "#0aaf78";
  taskDiv.querySelector("h3").style.textDecoration = "line-through";
}
