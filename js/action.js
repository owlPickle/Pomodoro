window.onload = function () {

  // Time
  let startBtn = document.getElementById("startbtn");
  let pauseBtn = document.getElementById("pausebtn");
  let timeCount = document.getElementById("time");
  let counter = 0;
  let timeLimit = 0.05 * 60;



  function transform(s) {
    let min = Math.trunc(s / 60);
    let sec = s % 60;
    if (min.toString().length == 1) {
      min = "0" + min;
    }
    if (sec.toString().length == 1) {
      sec = "0" + sec;
    }
    return min + ':' + sec;
  }

  timeCount.innerHTML = transform(timeLimit - counter);

  function timeIt() {
    counter++;
    timeCount.innerHTML = transform(timeLimit - counter);
    timesUp();
  }

  function timesUp() {
    if (counter === timeLimit) {
      var audio = new Audio('pickle_rick.mp3');
      audio.play();
      clearInterval(showTime);
      pauseMode();
      resetTimer();
    }
  }

  function resetTimer() {
    timeLimit = 0.05 * 60;
    counter = 0;
    timeCount.innerHTML = transform(timeLimit - counter);
  }

  startBtn.addEventListener("click", function () {
    startMode();
    showTime = setInterval(timeIt, 1000);
  })

  pauseBtn.addEventListener("click", function (e) {
    pauseMode();
    clearInterval(showTime);
  });

  function startMode() {
    startBtn.classList.remove('open');
    pauseBtn.classList.add('open');
  }

  function pauseMode() {
    pauseBtn.classList.remove('open');
    startBtn.classList.add('open');
  }


  //Todo
  let addInput = document.getElementById('add-todo-input');
  let addBtn = document.getElementById('add-mission');
  let todo = document.getElementById('todo-wrap');
  let playTodo = document.getElementsByClassName('icon-play-circled2');
  let mainTodo = document.getElementById('main-title');
  let check = "check";
  let unCheck = "";
  let id = 0;
  let List = [];

  let listData = localStorage.getItem("todoList");

  if (listData) {
    List = JSON.parse(listData);
    id = List.length;
    loadList(List);
  } else {
    List = [],
      id = 0
  }


  function loadList(arr) {
    arr.forEach(function (item) {
      addList(item.id, item.content, item.done);
    })
  }

  function addList(id, addTitle, done) {

    const complete = done ? check : unCheck;

    let listTemplate = `
      <li class="list-item ${complete}" job="" id="${id}">
        <div class="circle middle" job="check" id="${id}"></div>
        <div class="todo" job="">${addTitle}</div>
        <div class="icon-play-circled2" job=""></div>
      </li>
    `;

    todo.insertAdjacentHTML('beforeend', listTemplate);
    id++;
    addInput.value = "";
  }

  addBtn.addEventListener("click", addTODO);
  addInput.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {

      addTODO();

    }
  })

  function addTODO() {
    addTitle = document.getElementById('add-todo-input').value;

    if (addTitle.trim().length > 0) {
      addList(id, addTitle, false, false);

      List.push({
        content: addTitle,
        id: id,
        done: false,
      })

      localStorage.setItem("todoList", JSON.stringify(List));
      id++;

    } else {
      alert("Write Something !");
    }
  }

  function todoNOW() {
    for(var i = 0; i < playTodo.length; i++) {
      playTodo[i].addEventListener("click", function(e){
        let todoItem = e.target.parentElement;
        mainTodo.innerHTML = todoItem.children[1].innerText;
      })
      
    }
  }
  todoNOW();

  // check
  function checkTodo(element) {
    element.classList.toggle(check);
    List[element.id].done = List[element.id].done ? false : true;
  }

  todo.addEventListener("click", function (e) {
    let element = e.target.parentElement;
    let elJob = e.target.attributes.job.value;
    if (elJob === "check") {
      checkTodo(element);
    }

    localStorage.setItem("todoList", JSON.stringify(List));

  })








































}