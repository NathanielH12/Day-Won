import { adminTimerCreate, adminTimerStart } from '../timer';
import { adminAuthRegister } from '../auth';
import { clear } from '../other';

beforeEach(() => {
    clear();
});

const SUCCESS = { timerId: expect.any(Number) };
const ERROR = { error: expect.any(String) };

describe('adminTimerCreate', () => {
    let userId: number;

    beforeEach(() => {
        userId = adminAuthRegister('nathaniel@gmail.com', 'IsThisAValidPassword123!', 'nathaniel', 'hendra').authUserId;
    });

    describe('Error cases', () => {
        test('timerName is longer than 30 characters', () => {
            const result = adminTimerCreate(userId, 'thisIsLongerThanThirtyCharacters', 30);
            expect(result).toStrictEqual(ERROR);
        });

        test.each([
            { test: 'is 0', timerLength: 0 },
            { test: 'is negative', timerLength: -5 }
        ])('Timer length $test', ({ timerLength }) => {
            expect(adminTimerCreate(userId, 'timerName', timerLength)).toStrictEqual(ERROR);
        });

        test('Returns an error if there exists another timer with same timer length', () => {
            const timer1 = adminTimerCreate(userId, 'sameTimerName', 30);
            expect(timer1).toStrictEqual(SUCCESS);

            const timer2 = adminTimerCreate(userId, 'sameTimerName', 30);
            expect(timer2).toStrictEqual(ERROR);
        });

        test('Returns an error if another timer is in ACTIVE state', () => {
            const timer = adminTimerCreate(userId, 'Timer One', 30);
            expect(timer).toStrictEqual(SUCCESS);

            const timerId = timer.timerId;

            // starting the timer makes the timer change to ACTIVE state
            const startTimer = adminTimerStart(userId, timerId);
            expect(startTimer).toStrictEqual({});

            const newTimer = adminTimerCreate(userId, 'Timer Two', 30);
            expect(newTimer).toStrictEqual(ERROR);
        });
    });

    describe('Success cases', () => {
        test('Successfully creates a timer', () => {
            const result = adminTimerCreate(userId, 'timerOne', 30);
            expect(result).toStrictEqual(SUCCESS);
        });

        test('Successfully creates a timer with special characters in the timer name', () => {
            const result = adminTimerCreate(userId, '!@#$%^&*(){}[]', 30);
            expect(result).toStrictEqual(SUCCESS);
        });

        test('Successfully creates multiple timers', () => {
            const timer1 = adminTimerCreate(userId, 'Timer one', 30);
            expect(timer1).toStrictEqual(SUCCESS);
            const timer2 = adminTimerCreate(userId, 'Timer two', 60);
            expect(timer2).toStrictEqual(SUCCESS);
            const timer3 = adminTimerCreate(userId, 'Timer three', 15);
            expect(timer3).toStrictEqual(SUCCESS);
            const timer4 = adminTimerCreate(userId, 'Timer four', 20);
            expect(timer4).toStrictEqual(SUCCESS);
        });

        describe('Success edge cases', () => {
            test('Successfully creates a timer for 24 hours', () => {
                const result = adminTimerCreate(userId, '24 hour timer', 1440);
                expect(result).toStrictEqual(SUCCESS);
            });

            test('Successfully creates a timer for 1 minute', () => {
                const result = adminTimerCreate(userId, 'One Minute Timer', 1);
                expect(result).toStrictEqual(SUCCESS);
            });
        });
    });
});
