import {
    toggleTimerLogic,
    resetTimer,
    timerOn,
    getTime,
    setTime
} from '../dist/timer.js';

let startingTime = 0;

const ONE_SEC = 100;
const ONE_MIN = 60 * ONE_SEC;
const ONE_HOUR = 60 * ONE_MIN;

const timer = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const customiseBtn = document.getElementById('customiseBtn');
const hourUpBtn = document.getElementById('hourUpBtn');
const hourDownBtn = document.getElementById('hourDownBtn');
const minUpBtn = document.getElementById('minUpBtn');
const minDownBtn = document.getElementById('minDownBtn');

let isCustomising = false;
hideCustomiseBtns();

function hideCustomiseBtns() {
    hourUpBtn.style.display = 'none';
    hourDownBtn.style.display = 'none';
    minUpBtn.style.display = 'none';
    minDownBtn.style.display = 'none';
}

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

function incrementMin() {
    const newTime = getTime() + (5 * ONE_MIN);
    setTime(newTime);
    updateDisplay();
}

function decrementMin() {
    const time = getTime();
    const decrementedTime = time - (5 * ONE_MIN);
    if (decrementedTime > 0) {
        setTime(decrementedTime);
        updateDisplay();
    }
}

async function customiseOrSaveTimer() {
    if (!isCustomising) {
        resetTimer();

        hourUpBtn.style.display = 'block';
        hourDownBtn.style.display = 'block';
        minUpBtn.style.display = 'block';
        minDownBtn.style.display = 'block';
        
        customiseBtn.innerHTML = 'Save';
        isCustomising = true;
    } else {
        // Saving
        try {
            const time = getTime();
            const totalSeconds = Math.floor(time / 100);
            let hours = Math.floor(totalSeconds / (60 * 60));
            let minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
            let seconds = totalSeconds % 60;

            await fetch("http://localhost:5500/timer/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    remainingTimeHrs: hours,
                    remainingTimeMins: minutes,
                    remainingTimeSecs: seconds
                })
            });

            startingTime = getTime();

        } catch (err) {
            console.warn("Failed to save timer", err);
        } finally {
            hideCustomiseBtns();
            customiseBtn.innerHTML = "Customise";
            isCustomising = false;
        }
    }
}

async function loadSavedTimer() {
    try {
        const response = await fetch("http://localhost:5500/timer/load");
        const data = await response.json();

        const totalTime = (data.remainingTimeHrs * 3600 + data.remainingTimeMins * 60 + data.remainingTimeSecs) * 100

        setTime(totalTime);
        startingTime = totalTime;
        updateDisplay();
    } catch (err) {
        console.warn("Failed to load saved timer", err)
    }
}

startBtn.addEventListener('click', () => {
    toggleTimerLogic();
    if (timerOn()) {
        hideCustomiseBtns();
    }
});

resetBtn.addEventListener('click', () => {
    resetTimer();
    hideCustomiseBtns();
    updateDisplay();
});

customiseBtn.addEventListener('click', customiseOrSaveTimer);
hourUpBtn.addEventListener('click', incrementHour);
hourDownBtn.addEventListener('click', decrementHour);
minUpBtn.addEventListener('click', incrementMin);
minDownBtn.addEventListener('click', decrementMin);

loadSavedTimer();