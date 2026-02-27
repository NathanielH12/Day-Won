import { getData, setData, saveDataToFile } from "./dataStore.js"

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

export function saveTimerToStorage() {
    const totalSeconds = Math.floor(time / 100);

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const data = getData();

    data.timers = {
        remainingTimeHrs: hrs,
        remainingTimeMins: mins,
        remainingTimeSecs: secs
    }

    setData(data);
    saveDataToFile(data);
}

export function loadTimerFromStorage() {
    const data = getData();

    const totalSeconds = data.timers.remainingTimeHrs * 3600 + data.timers.remainingTimeMins * 60 + data.timers.remainingTimeSecs;
    time = totalSeconds * 100;
}
