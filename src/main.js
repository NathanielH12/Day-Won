import {
    startTimer,
    resetTimer,
    customiseTimer
} from "timer";

const timer = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const customiseBtn = document.getElementById('customiseBtn');

startBtn.addEventListener('click', () => startTimer(startBtn, timer));
resetBtn.addEventListener('click', () => resetTimer(startBtn, timer));
customiseBtn.addEventListener('click', () => customiseTimer(startBtn, timer));
