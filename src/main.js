import {
    toggleTimerLogic,
    resetTimer,
    timerOn,
    getTime
} from '../dist/timer.js';
console.log('main.js loaded');
const timer = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const customiseBtn = document.getElementById('customiseBtn');

export function updateDisplay() {
    const time = getTime();
    const totalSeconds = Math.floor(time / 100);
    let hours = Math.floor(totalSeconds / (60 * 60));
    let minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    let seconds = totalSeconds % 60;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timer.innerHTML = `${hours}:${minutes}:${seconds}`;

    startBtn.innerHTML = timerOn() ? 'Pause' : 'Start';
}

setInterval(updateDisplay, 10);


function customiseTimer() {
    resetTimer();
    // then begin adding functionality for customising the timer
}

startBtn.addEventListener('click', toggleTimerLogic);
resetBtn.addEventListener('click', resetTimer);
customiseBtn.addEventListener('click', customiseTimer);