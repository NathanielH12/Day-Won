
const startingTime = 30 * 60 * 100;
let time = startingTime;
let isTimerOn = false;
let timerId = null;

const FIVE_MINUTES = 60 * 100 * 5;

const timer = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const customiseBtn = document.getElementById('customiseBtn');
const minUpBtn = document.getElementById('minUpBtn');
const minDownBtn = document.getElementById('minDownBtn');

minUpBtn.style.display = 'none';
minDownBtn.style.display = 'none';

function hideCustomiseBtns() {
    minUpBtn.style.display = 'none';
    minDownBtn.style.display = 'none';
}

function startTimer() {
    if (isTimerOn === true) {
        // Timer is counting down, pause it
        clearInterval(timerId);
        isTimerOn = false;
        startBtn.innerHTML = 'Start';
    } else {
        updateTimer();
        timerId = setInterval(updateTimer, 10);
        isTimerOn = true;
        startBtn.innerHTML = 'Pause';
    }

    hideCustomiseBtns();
}

function updateDisplay() {
    time = Math.max(0, time); 
    const totalSeconds = Math.floor(time / 100);
    let hours = Math.floor(totalSeconds / (60 * 60));
    let minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    let seconds = totalSeconds % 60;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timer.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function updateTimer() {
    if (time <= 0) {
        clearInterval(timerId);
        timer.innerHTML = '00:00:00:00';
        time = startingTime;
        isTimerOn = false;
        return;
    }

    updateDisplay();
    time--;
}

function resetTimer() {
    clearInterval(timerId);
    time = startingTime;
    isTimerOn = false;
    startBtn.innerHTML = 'Start';
    
    updateDisplay();
    hideCustomiseBtns();
}

function incrementMin() {
    time += FIVE_MINUTES;
    updateDisplay();
}

function decrementMin() {
    time -= FIVE_MINUTES;
    updateDisplay();
}

function customiseTimer() {
    resetTimer();

    minUpBtn.style.display = 'block';
    minDownBtn.style.display = 'block';
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
customiseBtn.addEventListener('click', customiseTimer);
minUpBtn.addEventListener('click', incrementMin);
minDownBtn.addEventListener('click', decrementMin);