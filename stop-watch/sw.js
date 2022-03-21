let seconds = 00;
let tens = 00;
let minutes = 00;
let list = document.getElementById("list");
let secs = document.getElementById("seconds");
let mins = document.getElementById("minutes");
let ten = document.getElementById("tens");
let stop = document.getElementById("stop");
let start = document.getElementById("start");
let lab = document.getElementById("lab");
let restart = document.getElementById("restart");
let timer = document.getElementById("Timer");
let clear = document.getElementById("clear");
let interval;

function startTimer() {
  tens++;
  if (tens <= 9) {
    ten.innerHTML = "0" + tens;
  }
  if (tens > 9) {
    ten.innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    secs.innerHTML = "0" + seconds;
    tens = 0;
    ten.innerHTML = "0" + tens;
  }
  if (seconds > 9) {
    secs.innerHTML = seconds;
  }
  if (seconds > 59) {
    minutes++;
    seconds = 0;
    secs.innerHTML = "0" + seconds;
    mins.innerHTML = "0" + minutes;
  }
  if (minutes > 9) {
    mins.innerHTML = minutes;
  }
}
start.addEventListener("click", () => {
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
});
stop.onclick = function () {
  clearInterval(interval);
};
restart.addEventListener("click", () => {
  clearInterval(interval);
  mins.innerHTML = "00";
  secs.innerHTML = "00";
  ten.innerHTML = "00";
  tens = 0;
  seconds = 0;
  minutes = 0;
});

function btnone() {
  list.innerHTML += `<li>${timer.innerHTML}</li>`;
}

clear.addEventListener("click", function () {
  list.innerHTML = "";
});
