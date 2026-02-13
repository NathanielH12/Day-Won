import {
    toggleTimerLogic,
    resetTimer,
    timerOn,
    getTime,
    setTime
} from '../dist/timer.js';

const ONE_SEC = 100;
const ONE_MIN = 60 * ONE_SEC;
const ONE_HOUR = 60 * ONE_MIN;

const timer = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const customiseBtn = document.getElementById('customiseBtn');
const hourUpBtn = document.getElementById('hourUpBtn');
const hourDownBtn = document.getElementById('hourDownBtn');

hourUpBtn.style.display = 'none';
hourDownBtn.style.display = 'none';
let isCustomising = false;

function hideCustomiseBtns() {
    isCustomising = false;
    hourUpBtn.style.display = 'none';
    hourDownBtn.style.display = 'none';
}

export function updateDisplay() {
    const time = getTime();
    const totalSeconds = Math.floor(time / 100);
    let hours = Math.floor(totalSeconds / (60 * 60));
    let minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    let seconds = totalSeconds % 60;

    if (!isCustomising) {
        hideCustomiseBtns();
    } else {
        isCustomising = true;
    }

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timer.innerHTML = `${hours}:${minutes}:${seconds}`;

    startBtn.innerHTML = timerOn() ? 'Pause' : 'Start';
}

setInterval(updateDisplay, 10);

function incrementHour() {
    const newTime = getTime() + ONE_HOUR;

    if (newTime <= 25 * ONE_HOUR) {
        setTime(newTime);
        updateDisplay();
    }
}

function decrementHour() {
    const time = getTime();
    const decrementedTime = time - ONE_HOUR;
    if (decrementedTime > 0) {
        setTime(decrementedTime);
        updateDisplay();
    }
}

function customiseTimer() {
    resetTimer();

    isCustomising = true;
    hourUpBtn.style.display = 'block';
    hourDownBtn.style.display = 'block';
}

startBtn.addEventListener('click', toggleTimerLogic);
resetBtn.addEventListener('click', resetTimer);
customiseBtn.addEventListener('click', customiseTimer);
hourUpBtn.addEventListener('click', incrementHour);
hourDownBtn.addEventListener('click', decrementHour);
