import { Timers, TimerState } from './interface';

const MAX_NAME_LENGTH = 30;
const MAX_TIME_LENGTH = 1440;
const MIN_TIME_LENGTH = 0;

/**
 * Checks if the timer name is equal to or less than 30 characters.
 *
 * @param {string} name - The name to validate.
 *
 * @returns {boolean} - Returns true if the timer name length is valid, and false otherwise.
 */
function nameIsValidLength(name: string) {
    return name.length <= MAX_NAME_LENGTH;
}

/**
 * Checks if the timer length is greater than 0 and less than or equal to 25 hours (1440 minutes).
 *
 * @param {number}  length - The name to validate.
 *
 * @returns {boolean} - Returns true if the timer length is valid, and false otherwise.
 */
function lengthIsValidLength(length: number) {
    return length > MIN_TIME_LENGTH && length <= MAX_TIME_LENGTH;
}

/**
 * Checks if there is another timer that is ACTIVE.
 *
 * @param {Array} timers - Array of timer objects.
 *
 * @returns {boolean} - Returns true if there exists a timer that is ACTIVE, and false otherwise.
 */
function isAnyTimersActive(timers: Timers[]) {
    return timers.find(timer => timer.timerState === TimerState.ACTIVE);
}

/**
 * Checks if there is another timer that is has the same time length.
 *
 * @param {number} timeLength - Time length of timer in minutes.
 * @param {Array} timers - Array of timer objects.
 *
 * @returns {boolean} - Returns true if there exists a timer with the same length, and false otherwise.
 */
function isAnyTimersSameLength(timeLength: number, timers: Timers[]) {
    return timers.find(timer => timer.timerMins === timeLength);
}

/**
 * Gets a new timerId by incrementing maximum timerId from the list of timers.
 *
 * @param {Array} timers - Array of timer objects.
 *
 * @returns {number} - Returns the new timer ID.
 */
function getNewTimerId(timers: Timers[]) {
    let maxTimerId = 0;
    for (const timer of timers) {
        if (timer.userId > maxTimerId) {
            maxTimerId = timer.timerId;
        }
    }
    return maxTimerId + 1;
}

/**
 * Checks if the timer name is already in use.
 *
 * @param {Array} timers - Array of timer objects.
 *
 * @returns {boolean} - Returns true if there exists a timer with that name and false otherwise.
 */
function isTimerNameUsed(timers: Timers[], name: string) {
    return timers.find(timer => timer.timerName === name);
}

export {
    nameIsValidLength,
    lengthIsValidLength,
    getNewTimerId,
    isAnyTimersActive,
    isAnyTimersSameLength,
    isTimerNameUsed
};
