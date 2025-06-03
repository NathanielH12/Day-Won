import { getData, setData } from './dataStore';

import {
    emailIsUnused,
    nameIsValidCharacter,
    nameIsValidLength,
    passwordIsValidLength,
    passwordHasNameAndLetter,
    getNewUserId,
    findUser,
    findCurrentPass,
    passUsedBefore
} from './helperFileAuth';

const validator = require('validator');
const zxcvbn = require('zxcvbn');

function adminAuthRegister(email: string, password: string, nameFirst: string, nameLast: string) {
    let store = getData();
    email = email.toLowerCase();

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

    const pass = zxcvbn(password);
    if (pass.score < 4) {
        return { error: `${pass.feedback.warning}, ${pass.feedback.suggestions}` };
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

/**
  * Provides all relevant details about a select user.
  *
  * @param {number} authUserId - The unique ID of the user.
  *
  * @returns {{
  *     user: {
  *         userId: number,
  *         name: string,
  *         email: string,
  *         numSuccessfulLogins: number,
  *         numFailedPasswordsSinceLastLogin: number,
  *     }
  * }} - An object containing an object with the details of the user
*/
function adminUserDetails(authUserId: number) {
    const currentData = getData();
    
    const user = currentData.users.find((user) => user.userId === authUserId);
    if (!user) {
        return { error: 'AuthUserId is not a valid user!' };
    }

    return {
        user: {
            userId: user.userId,
            name: user.nameFirst + ' ' + user.nameLast,
            email: user.email,
            numSuccessfulLogins: user.numSuccessfulLogins,
            numFailedPasswordsSinceLastLogin: user.numFailedPasswordsSinceLastLogin,
        }
    };
}

function adminUserDetailsUpdate(authUserId: number, email: string, nameFirst: string, nameLast: string) {
    return { }
}

/**
 * Given details relating to a password change,
 * update the password of a logged in user.
 *
 * @param {number} authUserId
 * @param {string} oldPassword
 * @param {string} newPassword
 * @returns {} - when user successfully update their password, an empty object is return
 */

function adminUserPasswordUpdate(authUserId: number, oldPassword: string, newPassword: string) {
    if (!findUser(authUserId)) {
        return { error: 'userId is not a valid user.' };
    }
    
    if (oldPassword != findCurrentPass(authUserId)) {
        return { error: 'Old Password is not the correct old password' };
    }
    
    if (oldPassword === newPassword) {
        return { error: 'Old Password and New Password match exactly' };
    }
    
    if (passUsedBefore(authUserId, newPassword)) {
        return { error: 'New Password has already been used before by this user' };
    }
    
    // Checking password strength

    const pass = zxcvbn(newPassword);
    if (pass.score < 4) {
        return { error: `${pass.feedback.warning}, ${pass.feedback.suggestions}` };
    }

    if (newPassword.length < 8) {
        return { error: 'New Password is less than 8 characters' };
    }

    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
        return { error: 'New Password must contain at least one letter and one number'}
    }

    const user = findUser(authUserId);
    user.password = newPassword;
    user.passwordHistory.push(newPassword);

    return {}
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
    adminUserDetails,
    adminUserDetailsUpdate,
    adminUserPasswordUpdate
}