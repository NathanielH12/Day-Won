import { getData } from "./dataStore";
import { Data, Users } from "./interface";

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;
const MIN_PASSWORD_LENGTH = 8;

/**
 * Checks if the email is unused by any user in the store.
 *
 * @param {string} email - The email to validate.
 * @param {object} store - Object containing array of users and quizzes.
 *
 * @returns {boolean} - Returns true if the email is unused, and false otherwise.
 */
function emailIsUnused(email: string, store: Data) {
    for (const user of store.users) {
        if (user.email === email) {
            return false;
        }
    }
    return true;
}

/**
 * Checks if the name contains only valid characters.
 *
 * @param {string} name - The name (First/Last) to validate.
 *
 * @returns {boolean} - Returns true if the name contains only valid characters, and false otherwise.
 */
function nameIsValidCharacter(name: string) {
    for (let i = 0; i < name.length; i++) {
        let character = name.charAt(i);
        if (!((character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z') || character === ' ' || character === '-' || character === '\'')) {
            return false;
        }
    }
    return true;
};

/**
 * Checks if the name (First/Last) is between 2 and 20 characters.
 *
 * @param {string} name - The name to validate.
 *
 * @returns {boolean} - Returns true if the name length is valid, and false otherwise.
 */
function nameIsValidLength(name: string) {
    return (name.length >= MIN_NAME_LENGTH && name.length <= MAX_NAME_LENGTH);
}

/**
 * Checks if the password is at least 8 characters.
 *
 * @param {string} password - The password to validate.
 *
 * @returns {boolean} - Returns true if the password length is valid, and false otherwise.
 */
function passwordIsValidLength(password: string) {
    return (password.length >= MIN_PASSWORD_LENGTH);
}

/**
 * Validates if the password contains at least one letter and one number.
 *
 * @param {string} password - The password to validate.
 *
 * @returns {boolean} - Returns true if the password contains both a letter and a number, and false otherwise.
 */
function passwordHasNameAndLetter(password: string) {
    let hasLetter = false;
    let hasNumber = false;

    for (let i = 0; i < password.length; i++) {
        let character = password.charAt(i);
        if ((character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z')) {
            hasLetter = true;
        } else if (character >= '0' && character <= '9') {
            hasNumber = true;
        }
    }

    return hasLetter && hasNumber;
}

/**
 * Gets the maximum userId from the list of users.
 *
 * @param {Array} users - Array of user objects.
 *
 * @returns {number} - Returns the maximum user ID.
 */
function getNewUserId(users: Users[]) {
    let maxUserId = 0;
    for (const user of users) {
        if (user.userId > maxUserId) {
            maxUserId = user.userId;
        }
    }
    return maxUserId + 1;
}

/**
 * Checks if userId is valid.
 *
 * @param {number} userId
 *
 * @returns {Users}
 */
function findUser(userId: number) {
    const data = getData();
    return data.users.find(user => user.userId === userId);
}

/**
 * Returns a given users password.
 *
 * @param {number} userId
 *
 * @returns {string}
 */
function findCurrentPass(userId: number) {
    const user = findUser(userId);
    return user.password;
}

export {
  emailIsUnused,
  nameIsValidCharacter,
  nameIsValidLength,
  passwordIsValidLength,
  passwordHasNameAndLetter,
  getNewUserId,
  findUser,
  findCurrentPass
}
