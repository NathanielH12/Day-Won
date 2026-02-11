
const startingTime = 30 * 60 * 100;
let time = startingTime;
let isTimerOn = false;
let timerId = null;

const timer = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const customiseBtn = document.getElementById('customiseBtn');
const hourUpBtn = document.getElementById('hourUpBtn');
const hourDownBtn = document.getElementById('hourDownBtn');

hourUpBtn.style.display = 'none';
hourDownBtn.style.display = 'none';

function hideCustomiseBtns() {
    hourUpBtn.style.display = 'none';
    hourDownBtn.style.display = 'none';
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

function incrementHour() {
    // set max hours restriction?
    time += 60 * 60 * 100;
    updateDisplay();
}

function decrementHour() {
    const decrementedTime = time - (60 * 60 * 100);
    if (decrementedTime > 0) {
        time = decrementedTime;
        updateDisplay();
    }
}

function customiseTimer() {
    resetTimer();
    // then begin adding functionality for customising the timer

    // when pressed increment, decrement and save buttons pop up
    hourUpBtn.style.display = 'block';
    hourDownBtn.style.display = 'block';
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
customiseBtn.addEventListener('click', customiseTimer);
hourUpBtn.addEventListener('click', incrementHour);
hourDownBtn.addEventListener('click', decrementHour);
