let conutertodo = 0;
let conuterdone = 0;
let taskDeleted;
let container = document.querySelector(".task_container");
function emptyText() {
  document.getElementById('search').value = '';
}
let tasks = JSON.parse(window.localStorage.getItem('tasks')) ?? [];
showTasks(tasks, tasks.length)
function iconsClick(event) {
  if (event.target.matches('.fa-trash')) {
    taskDeleted = event.target;
    showConfirmDelete()
  } else if (event.target.matches('.fa-check-circle')) {
    changeStatus(event.target)
  }

}

container.addEventListener('click', iconsClick);
function deleteTask() {
  let deletedSection = taskDeleted.closest('section');
  deleteFromArray(deletedSection)
  container.innerHTML = "";
  hideConfirmDelete()
  showTasks(tasks, tasks.length);
}
function changeStatus(ev) {
  let targetSection = ev.closest('section');
  let indexOfSection = tasks.findIndex(task => task.taskName === targetSection.className);//
  if (targetSection.dataset.status === "toDo") {
    targetSection.setAttribute("data-status", "Done");
    conutertodo--;
    conuterdone++;
    window.localStorage.setItem('conutertodo', JSON.stringify(conutertodo));
    window.localStorage.setItem('conuterdone', JSON.stringify(conuterdone));
    displayCounter()
    let newTask = { ...tasks[indexOfSection], dataStatus: "Done" };
    tasks.splice(indexOfSection, 1, newTask);
  } else {
    targetSection.setAttribute("data-status", "toDo");
    tasks[indexOfSection].dataStatus == "toDo";
    conuterdone--;
    conutertodo++;
    window.localStorage.setItem('conutertodo', JSON.stringify(conutertodo));
    window.localStorage.setItem('conuterdone', JSON.stringify(conuterdone));
    displayCounter()
  }
}
function creatTaskName(taskName) {
  let wrapperTask = document.createElement("div");
  wrapperTask.className = "task_section";
  taskNameP = document.createElement("p");
  taskNameP.className = "taskNameP";
  taskNameP.innerHTML = taskName;
  console.log(taskName)
  let deleteIcon = document.createElement("i");
  deleteIcon.className = "fa fa-trash fa-2x";
  wrapperTask.appendChild(taskNameP);
  wrapperTask.appendChild(deleteIcon);
  return wrapperTask;
}
function createAssigneeName(assigneeName) {
  let wrapperAssignee = document.createElement("div");
  wrapperAssignee.className = "assignee_section";
  assigneeNameP = document.createElement("p");
  assigneeNameP.className = "assignee_value";
  assigneeNameP.innerHTML = assigneeName;
  let checkIcon = document.createElement("i");
  checkIcon.className = "fa fa-check-circle fa-2x";
  wrapperAssignee.appendChild(assigneeNameP);
  wrapperAssignee.appendChild(checkIcon);
  return wrapperAssignee;
}
function showTasks(arr, len) {
  for (let i = 0; i < len; i++) {
    let section = document.createElement("section");
    section.className = arr[i].taskName;
    section.setAttribute("data-status", "toDo");
    let taskName = arr[i].taskName;
    let assigneeName = arr[i].assigneeName;
    let task = creatTaskName(taskName);
    let assignee = createAssigneeName(assigneeName);
    section.appendChild(task);
    section.appendChild(assignee);
    container.prepend(section);
    displayCounter()
  }
}
function showResult(arr, len) {
  conutertodo = 0;
  conuterdone = 0;
  for (let i = 0; i < len; i++) {
    let section = document.createElement("section");
    section.className = arr[i].taskName;
    section.setAttribute("data-status", arr[i].dataStatus);
    secAttribute = section.getAttribute("data-status");
    if (secAttribute === "Done") {
      conuterdone++;
    } else {
      conutertodo++;
    }
    window.localStorage.setItem('conutertodo', JSON.stringify(conutertodo));
    window.localStorage.setItem('conuterdone', JSON.stringify(conuterdone));
    let taskName = arr[i].taskName;
    let assigneeName = arr[i].assigneeName;
    let task = creatTaskName(taskName);
    let assignee = createAssigneeName(assigneeName);
    section.appendChild(task);
    section.appendChild(assignee);
    container.appendChild(section);
  }
  document.getElementsByTagName('footer').innerHTML = "";
  displayCounter();
}

function addTask() {
  let taskName = document.getElementById('task_name').value;
  let assigneeName = document.querySelector(".assignee_text").value;
  if (taskName === "" && assigneeName == "") return
  const task = {
    "taskName": `${taskName}`,
    "assigneeName": `${assigneeName}`,
    "dataStatus": "toDo"
  }
  tasks.unshift(task);
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
  conutertodo++;
  window.localStorage.setItem('conutertodo', JSON.stringify(conutertodo));
  showTasks(tasks, 1);
  displayCounter()
  document.getElementById('task_name').value = '';
  document.querySelector(".assignee_text").value = '';
}
function showConfirmDelete() {
  document.getElementById("confirm_delete").style.opacity = 1;
}
function hideConfirmDelete() {
  document.getElementById("confirm_delete").style.opacity = 0;
}
function deleteFromArray(deletedSection) {
  const deletedtask = tasks.filter(task => task.taskName === deletedSection.className);
  if (deletedSection.getAttribute('data-status') === "Done") {
    window.localStorage.setItem('conuterdone', JSON.stringify(--conuterdone));
  } else {
    window.localStorage.setItem('conutertodo', JSON.stringify(--conutertodo));
  }
  displayCounter()
  tasks = tasks.filter(task => task.taskName != deletedSection.className);
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
}
function displayCounter() {
  document.getElementById("todo").innerHTML = JSON.parse(window.localStorage.getItem('conutertodo'));
  document.getElementById("done").innerHTML = JSON.parse(window.localStorage.getItem('conuterdone'));
}
function search() {
  taskName = document.getElementById('search').value;
  let resultArray = tasks.filter(task => task.taskName.includes(taskName));
  container.innerHTML = "";
  showResult(resultArray, resultArray.length)

}
