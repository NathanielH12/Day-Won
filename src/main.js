
const startingTime = 30 * 60;
let time = startingTime;
let isTimerOn = false;
let timerId = null;

const timer = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');

function startTimer() {
    if (isTimerOn === true) {
        // Timer is counting down, pause it
        clearInterval(timerId);
        isTimerOn = false;
        startBtn.innerHTML = 'Start';
    } else {
        timerId = setInterval(updateTimer, 1000);
        isTimerOn = true;
        startBtn.innerHTML = 'Pause';
    }
}

function updateTimer() {
    if (time <= 0) {
        clearInterval(timerId);
        timer.innerHTML = '00:00:00';
        time = startingTime;
        isTimerOn = false;
        return;
    }

    let hours = Math.floor(time / (60 * 60));
    let minutes = Math.floor((time % (60 * 60)) / 60);
    let seconds = time % 60;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timer.innerHTML = `${hours}:${minutes}:${seconds}`;
    time--;
}

startBtn.addEventListener('click', startTimer);
