interface Users {
    userId: number,
    nameFirst: string,
    nameLast: string,
    email: string,
    password: string,
    numSuccessfulLogins: number,
    numFailedPasswordsSinceLastLogin: number
    userSession: string[];
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
  