const ONE_SEC = 100;
const ONE_MIN = 60 * ONE_SEC;

let time = 0;
let isTimerOn = false;
let timerId : ReturnType<typeof setInterval>;
console.log('timer.js loaded');
export function toggleTimerLogic() {
    if (isTimerOn) {
        // Timer is counting down, pause it
        clearInterval(timerId);
        isTimerOn = false;
    } else {
        updateTimer();
        timerId = setInterval(updateTimer, 10);
        isTimerOn = true;
    }
}

function updateTimer() {
    if (time <= 0) {
        clearInterval(timerId);
        time = 0;
        isTimerOn = false;
        return;
    }

    time--;
}

export function resetTimer(newTime: number) {
    clearInterval(timerId);
    time = newTime;
    isTimerOn = false;
}

export function timerOn() {
    return isTimerOn;
}

export function getTime() {
    return time;
}

export function setTime(newTime : number) {
    time = newTime;
}
