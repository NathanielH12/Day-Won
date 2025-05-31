import { getData, setData } from './dataStore';

import {
    EmailisUnused,
    NameisValidCharacter,
    NameisValidLength,
    PasswordisValidLength,
    PasswordHasNameAndLetter,
    getNewUserId
} from './helperFile';

const validator = require('validator');

function adminAuthRegister(email: string, password: string, nameFirst: string, nameLast: string) {
    let store = getData();

    if (!EmailisUnused(email, store)) {
        return { error: 'Email is being used by another user!'};
    }

    if (!validator.isEmail(email)) {     
        return { error: 'Email address is not valid!' };
    } 

    if (!NameisValidCharacter(nameFirst)) {
        return { error: "First name contains characters other than lowercase letters, uppercase letters, spaces, hyphens, or apostrophes!"};
    }

    if (!NameisValidLength(nameFirst)) {
        return { error: "First name is less than 2 characters or more than 20 characters!"};
    }

    if (!NameisValidCharacter(nameLast)) {
        return { error: "Last name contains characters other than lowercase letters, uppercase letters, spaces, hyphens, or apostrophes!"};
    }

    if (!NameisValidLength(nameLast)) {
        return { error: "Last name is less than 2 characters or more than 20 characters!"};
    }

    if (!PasswordisValidLength(password)) {
        return { error: 'Password is less than 8 characters!' };
    } 
    
    if (!PasswordHasNameAndLetter(password)){
        return { error: 'Password must contain at least one letter and one number!' };
    }

    const newUserId = getNewUserId(store.users);

    store.users.push({
        userId: newUserId,
        nameFirst: nameFirst, 
        nameLast: nameLast,
        email: email, 
        password: password,
        numSuccessfulLogins: 1,
        numFailedPasswordsSinceLastLogin: 0,
        passwordHistory: [password]
    }); 

    setData(store);
    
    return {
        authUserId: newUserId
    }
}

function adminAuthLogin(email: string, password: string) {
    return {
        authUserId: 1
    }
}

function adminUserDetails(authUserId: number) {
    return {
        user: {
                userId: 1,
                name: "Cormie Flakes",
                email: "haydenFUUU@gmail.com",
                numSuccessfulLogins: 3,
                numFailedPasswordsSinceLastLogin: 1
        }
    }
}

function adminUserDetailsUpdate(authUserId: number, email: string, nameFirst: string) {
    return { }
}

function adminUserPasswordUpdate(authUserId: number, oldPassword: string, newPassword: string) {
    return { }
}

function adminTimerUpdate(authUserID: number) {
    return { }
}

function adminUpdateAchievements(authUserId: number) {
    return { }
}

function adminUpdateDailyStreak(authUserId: number) {
    return { }
}

function adminAddFriend(authUserId: number) {
    return { }
}

function adminRemoveFriend(authUserId: number) {
    return { }
}

function adminUpdateBalance(authUserId: number, amount: number) {
    return { }
}

export {
    adminAuthRegister,
    adminAuthLogin, 
    adminUserDetails
}