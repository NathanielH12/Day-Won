import { getData, setData } from './dataStore';

import {
    emailIsUnused,
    nameIsValidCharacter,
    nameIsValidLength,
    passwordIsValidLength,
    passwordHasNameAndLetter,
    getNewUserId
} from './helperFile';

const validator = require('validator');

function adminAuthRegister(email: string, password: string, nameFirst: string, nameLast: string) {
    let store = getData();

    if (!emailIsUnused(email, store)) {
        return { error: 'Email is being used by another user!'};
    }

    if (!validator.isEmail(email)) {    
        return { error: 'Email address is not valid!' };
    }

    if (!nameIsValidCharacter(nameFirst)) {
        return { error: "First name contains characters other than lowercase letters, uppercase letters, spaces, hyphens, or apostrophes!"};
    }

    if (!nameIsValidLength(nameFirst)) {
        return { error: "First name is less than 2 characters or more than 20 characters!"};
    }

    if (!nameIsValidCharacter(nameLast)) {
        return { error: "Last name contains characters other than lowercase letters, uppercase letters, spaces, hyphens, or apostrophes!"};
    }

    if (!nameIsValidLength(nameLast)) {
        return { error: "Last name is less than 2 characters or more than 20 characters!"};
    }

    if (!passwordIsValidLength(password)) {
        return { error: 'Password is less than 8 characters!' };
    }
   
    if (!passwordHasNameAndLetter(password)){
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

/**
  * Logs in a user using an email and password.
  *
  * @param {string} email - The email of the user.
  * @param {string} password - The password of the user.
  *
  * @returns {{authUserId: number}} - An object containing the unique ID of the
  *                                   user.
*/
function adminAuthLogin(email: string, password: string) {
    let store = getData()

    email = email.toLowerCase();
    const user = store.users.find((user) => user.email === email);
    if (!user) {
        return { error: 'Email address does not exist!' };
    }
   
    const correctPassword = store.users.find((user) => user.password === password);
    if (!correctPassword) {
        user.numFailedPasswordsSinceLastLogin++;
        setData(store);
        return { error: 'Password is not correct for the given email!' };
    }

    user.numSuccessfulLogins++;
    user.numFailedPasswordsSinceLastLogin = 0;
    setData(store);
   
    return { authUserId: user.userId };
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