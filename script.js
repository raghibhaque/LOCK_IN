
let timer;
let minutes = 60;
let seconds = 0;
let isRunning = false;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const timeInput = document.getElementById("timeInput");
const setTimeBtn = document.getElementById("setTimeBtn");
const statusText = document.getElementById("status");

function updateDisplay() {
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  statusText.textContent = "Stay focused...";
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        isRunning = false;
        statusText.textContent = "⏰ Time's up! Take a break.";
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  statusText.textContent = "Paused ⏸️";
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  minutes = parseInt(timeInput.value) || 25;
  seconds = 0;
  updateDisplay();
  statusText.textContent = "Ready to focus!";
}

setTimeBtn.addEventListener("click", () => {
  const newTime = parseInt(timeInput.value);
  if (newTime >= 1 && newTime <= 60) {
    minutes = newTime;
    seconds = 0;
    updateDisplay();
    statusText.textContent = `Timer set to ${newTime} minutes.`;
  } else {
    alert("Please enter a value between 1 and 60.");
  }
});

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
updateDisplay();

const systemTime = document.getElementById("systemTime");
function updateSystemTime() {
  const now = new Date();
  systemTime.textContent = now.toLocaleTimeString();
}
setInterval(updateSystemTime, 1000);
updateSystemTime();

// === Background Color Picker ===
const colorPicker1 = document.getElementById("colorPicker1");
const colorPicker2 = document.getElementById("colorPicker2");

function updateBackground() {
  const color1 = colorPicker1.value;
  const color2 = colorPicker2.value;
  document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
  localStorage.setItem("gradientColors", JSON.stringify({ color1, color2 }));
}

colorPicker1.addEventListener("input", updateBackground);
colorPicker2.addEventListener("input", updateBackground);

window.addEventListener("load", () => {
  const savedColors = JSON.parse(localStorage.getItem("gradientColors"));
  if (savedColors) {
    colorPicker1.value = savedColors.color1;
    colorPicker2.value = savedColors.color2;
    document.body.style.background = `linear-gradient(135deg, ${savedColors.color1}, ${savedColors.color2})`;
  }
});
