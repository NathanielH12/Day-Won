

const startingTime = 30 * 60 * 100;
let time = startingTime;
let isTimerOn = false;
let timerId: number;

function startTimer(startBtn: HTMLElement, timer: HTMLElement) {
    if (isTimerOn === true) {
        // Timer is counting down, pause it
        clearInterval(timerId);
        isTimerOn = false;
        startBtn.innerHTML = 'Start';
    } else {
        updateTimer(timer);
        timerId = setInterval(updateTimer, 10);
        isTimerOn = true;
        startBtn.innerHTML = 'Pause';
    }
}

function updateDisplay(timer: HTMLElement) {
    const totalSeconds = Math.floor(time / 100);
    const hours = Math.floor(totalSeconds / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    const hoursText = hours < 10 ? '0' + hours : hours;
    const minutesText = minutes < 10 ? '0' + minutes : minutes;
    const secondsText = seconds < 10 ? '0' + seconds : seconds;

    timer.innerHTML = `${hoursText}:${minutesText}:${secondsText}`;
}

function updateTimer(timer: HTMLElement) {
    if (time <= 0) {
        clearInterval(timerId);
        timer.innerHTML = '00:00:00:00';
        time = startingTime;
        isTimerOn = false;
        return;
    }

    updateDisplay(timer);
    time--;
}

function resetTimer(startBtn: HTMLElement, timer: HTMLElement) {
    clearInterval(timerId);
    time = startingTime;
    isTimerOn = false;
    startBtn.innerHTML = 'Start';

    updateDisplay(timer);
}

function customiseTimer(startBtn: HTMLElement, timer: HTMLElement) {
    resetTimer(startBtn, timer);
    // then begin adding functionality for customising the timer
}

export {
    startTimer,
    resetTimer,
    customiseTimer
}