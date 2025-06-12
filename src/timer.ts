import { getData, setData } from './dataStore';
import { TimerState } from './interface';
import {
    nameIsValidLength,
    lengthIsValidLength,
    getNewTimerId,
    isAnyTimersActive,
    isAnyTimersSameLength
} from './helperFileTimer';

const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;

function adminTimerCreate(authUserId: number, timerName: string, timeLength: number) {
    const store = getData();

    if (!nameIsValidLength(timerName)) {
        return { error: 'Timer name is more than 30 characters!' };
    }

    if (!lengthIsValidLength(timeLength)) {
        return { error: 'Time length is less than 0 or greater than 24 hours!' };
    }

    if (isAnyTimersActive(store.timers)) {
        return { error: 'Another timer is active!' };
    }

    if (isAnyTimersSameLength(timeLength, store.timers)) {
        return { error: 'Another timer already has the same length!' };
    }
    const newTimerId = getNewTimerId(store.timers);

    const timeLengthInHrs = timeLength / MINUTES_PER_HOUR;
    const timeLengthInSec = timeLength * SECONDS_PER_MINUTE;

    store.timers.push({
        userId: authUserId,
        timerState: TimerState.INACTIVE,
        timerId: newTimerId,
        timerName: timerName,
        timerHrs: timeLengthInHrs,
        timerMins: timeLength,
        remainingTimeHrs: timeLengthInHrs,
        remainingTimeMins: timeLength,
        remainingTimeSecs: timeLengthInSec
    });

    setData(store);

    return { timerId: newTimerId };
}

function adminTimerPause(authUserId: number, timerId: number) {
    return { };
}

function adminTimerStart(authUserId: number, timerId: number) {
    return { };
}

export {
    adminTimerCreate,
    adminTimerPause,
    adminTimerStart
};
