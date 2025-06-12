interface Users {
    userId: number,
    nameFirst: string,
    nameLast: string,
    email: string,
    password: string,
    numSuccessfulLogins: number,
    numFailedPasswordsSinceLastLogin: number
    // userSession: string[];
    passwordHistory: string[];
}

interface Quizzes {
    userId: number,
    quizId: number,
    name: string,
    description: string,
    timeCreated: number,
    timeLastEdited: number,
}

interface Timers {
    userId: number,
    timerState: TimerState,
    timerId: number,
    timerName: string,
    timerHrs: number,
    timerMins: number,
    remainingTimeHrs: number,
    remainingTimeMins: number,
    remainingTimeSecs: number
}

enum TimerState {
    ACTIVE = 1,
    INACTIVE = 0
}

interface Register {
    authUserId?: number;
    error?: string;
}

interface Data {
    users: Users[],
    quizzes: Quizzes[],
    timers: Timers[]
}

export {
    Data,
    Users,
    Register,
    Timers,
    TimerState
};
