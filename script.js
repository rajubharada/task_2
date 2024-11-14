let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// Display elements
const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

// Format time
function formatTime(time) {
  let milliseconds = Math.floor((time % 1000) / 10);
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);

  return (
    (minutes < 10 ? '0' + minutes : minutes) + ':' +
    (seconds < 10 ? '0' + seconds : seconds) + ':' +
    (milliseconds < 10 ? '0' + milliseconds : milliseconds)
  );
}

// Start or pause the timer
function startPause() {
  if (!isRunning) {
    startPauseBtn.textContent = 'Pause';
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timeDisplay.textContent = formatTime(elapsedTime);
    }, 10);
  } else {
    startPauseBtn.textContent = 'Start';
    clearInterval(timerInterval);
  }
  isRunning = !isRunning;
}

// Reset the timer
function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  timeDisplay.textContent = "00:00:00";
  startPauseBtn.textContent = 'Start';
  lapsContainer.innerHTML = '<h3>Laps</h3>';
}

// Record a lap
function recordLap() {
  if (isRunning) {
    const lapTime = document.createElement('p');
    lapTime.textContent = formatTime(elapsedTime);
    lapsContainer.appendChild(lapTime);
  }
}

// Event listeners
startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
