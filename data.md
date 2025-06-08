let data = {
  users: [
    {
      userId: 1,
      email: 'hayden.smith@unsw.edu.au',
      nameFirst: 'Hayden',
      nameLast: 'Smith',
      password: 'COMP1531',
      passwordHistory: ['Password123', 'Johnsadfo21'],
      numSuccessfulLogins: 3,
      numFailedPasswordsSinceLastLogin: 1,
      dailyStreak: 1,
      achievements: ['Hardworker', 'Gooood Boy!'],
      Friends: [user1, user2, user3]
    }
  ],
  quizzes: [
    {
      userId: 2,
      quizId: 2,
      name: 'My Quiz',
      description: 'This is my quiz',
      timeCreated: 7835502863,
      timeLastEdited: 2739173233,
      numQuestions: 1,
      questions: []
    }
  ], 
  timers: [
    {
      userId: 1,
      timerId: 3,
      timerName: 'timerOne',
      timerHrs: 3,
      timerMins: 3,
      remainingTimeHrs: 3,
      remainingTimeMins: 3,
      remainingTimeSecs: 3
    }
  ]
}