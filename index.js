conutertodo = 0;
conuterdone = 0;
container = document.querySelector(".task_container");
function emptyText() {
  document.getElementById('search').value = '';
}
tasks = []
function iconsClick(event) {
  if (event.target.matches('.fa-trash')) {
    showConfirmDelete()
    taskDeleted = event.target;
  } else if (event.target.matches('.fa-check-circle')) {
    changeStatus(event.target)
  }

}

container.addEventListener('click', iconsClick);
function deleteTask() {
  deletedSection = taskDeleted.closest('section');
  deleteFromArray(deletedSection)
  container.innerHTML="";
  hideConfirmDelete()
  showTasks(tasks,tasks.length);
}
function changeStatus(ev) {
  targetSection = ev.closest('section');
  indexOfSection = tasks.findIndex(task => task.task_name === targetSection.className);
  if (targetSection.dataset.status === "toDo") {
    targetSection.setAttribute("data-status", "Done");
    conutertodo--;
    conuterdone++;
    displayCounter()
    const newTask = { ...tasks[indexOfSection], data_status: "Done" };
    tasks.splice(indexOfSection, 1, newTask);
    console.log(newTask)

    console.log(tasks)
  } else {
    targetSection.setAttribute("data-status", "toDo");
    tasks[indexOfSection].data_status == "toDo";
    console.log(tasks[indexOfSection].data_status)
    conuterdone--;
    conutertodo++;
    displayCounter()
  }
}
function creatTaskName(taskName) {
  var wrapper_task = document.createElement("div");
  wrapper_task.className = "task_section";
  var task_name = document.createElement("p");
  task_name.className = "task_name";
  task_name.innerHTML = taskName;
  var deleteIcon = document.createElement("i");
  deleteIcon.className = "fa fa-trash fa-2x";
  wrapper_task.appendChild(task_name);
  wrapper_task.appendChild(deleteIcon);
  return wrapper_task;
}
function createAssigneeName(assigneeName) {
  var wrapper_assignee = document.createElement("div");
  wrapper_assignee.className = "assignee_section";
  var assignee_name = document.createElement("p");
  assignee_name.className = "assignee_value";
  assignee_name.innerHTML = assigneeName;
  var checkIcon = document.createElement("i");
  checkIcon.className = "fa fa-check-circle fa-2x";
  wrapper_assignee.appendChild(assignee_name);
  wrapper_assignee.appendChild(checkIcon);
  return wrapper_assignee;
}
function showTasks(arr, len) {
  for (var i = 0; i < len; i++) {
    var section = document.createElement("section");
    section.className = arr[i].task_name;
    section.setAttribute("data-status", "toDo");
    var taskName = arr[i].task_name;
    var assigneeName = arr[i].Assignee_name;
    var task = creatTaskName(taskName);
    var assignee = createAssigneeName(assigneeName);
    section.appendChild(task);
    section.appendChild(assignee);
    container.prepend(section);
  }
}
function showResult(arr, len) {
  conuterdone = 0;
  conutertodo = 0;
  for (var i = 0; i < len; i++) {
    var section = document.createElement("section");
    section.className = arr[i].task_name;
    section.setAttribute("data-status", arr[i].data_status);
    secAttribute = section.getAttribute("data-status");
    if (secAttribute === "Done") {
      conuterdone++;
    } else {
      conutertodo++;
    }
    var taskName = arr[i].task_name;
    var assigneeName = arr[i].Assignee_name;
    var task = creatTaskName(taskName);
    var assignee = createAssigneeName(assigneeName);
    section.appendChild(task);
    section.appendChild(assignee);
    container.appendChild(section);
  }
  document.getElementsByTagName('footer').innerHTML = "";
  console.log(conutertodo)
  displayCounter();
}

function addTask() {
  var taskName = document.getElementById('task_name').value;
  var assigneeName = document.querySelector(".assignee_text").value;
  if (taskName === "" && assigneeName == "") return
  const task = {
    "task_name": `${taskName}`,
    "Assignee_name": `${assigneeName}`,
    "data_status": "toDo"
  }
  tasks.unshift(task);
  conutertodo++;
  console.log(conutertodo)
  console.log(conuterdone)
  showTasks(tasks, 1);
  displayCounter()
  console.log(tasks)
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
  const deletedtask = tasks.filter(task => task.task_name === deletedSection.className);
  if (deletedSection.getAttribute('data-status') === "Done") {
    conuterdone--;
  } else {
    conutertodo--;
  }

  console.log(deletedtask)
  displayCounter()
  tasks = tasks.filter(task => task.task_name != deletedSection.className);
  console.log(tasks)
}
function displayCounter() {
  document.getElementById("todo").innerHTML = conutertodo;
  document.getElementById("done").innerHTML = conuterdone;
}
function search() {
  taskName = document.getElementById('search').value;
  let resultArray = tasks.filter(task => task.task_name.includes(taskName));
  container.innerHTML = "";
  showResult(resultArray, resultArray.length)

}
