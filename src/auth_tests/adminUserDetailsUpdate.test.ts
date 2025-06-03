import { adminUserDetailsUpdate, adminAuthRegister, adminUserDetails } from "../auth"
import { Register } from "../interface";
import { clear } from "../other"


let user: Register; 

const newEmail = 'newemail@gmail.com';
const newFirstName = 'NewFirst';
const newLastName = 'NewLast'; 

beforeEach(()=> {
    clear();
    user = adminAuthRegister('email@gmail.com', 'Password', 'Firstname', 'Lastname');
});

const ERROR_STRING = { error: expect.any(String) };

describe('AdminUserDetailsUpdate', () => {
    describe('Error Cases', () => {
        describe('AuthUserId cases', () => {
            test('authUserId is invalid', () => {
                expect(adminUserDetailsUpdate(user.authUserId + 1, newEmail, newFirstName, newLastName)).toStrictEqual(ERROR_STRING);
                expect(adminUserDetailsUpdate(user.authUserId + 2, newEmail, newFirstName, newLastName)).toStrictEqual(ERROR_STRING);
                expect(adminUserDetailsUpdate(user.authUserId + 100, newEmail, newFirstName, newLastName)).toStrictEqual(ERROR_STRING);
                expect(adminUserDetailsUpdate(user.authUserId + 400, newEmail, newFirstName, newLastName)).toStrictEqual(ERROR_STRING);

            });
        });
        
        describe('Email cases', () => {
            test('Email address is invalid', () => {
                expect(adminUserDetailsUpdate(user.authUserId, 'email.com', newFirstName, newLastName)).toStrictEqual(ERROR_STRING);
            });

            test('Email address is already in use', () => {
                let secondUser = 'seconduser@gmail.com';
                expect(adminUserDetailsUpdate(user.authUserId, secondUser, newFirstName, newLastName)).toStrictEqual(ERROR_STRING);
            });
        });
        
        describe('First name cases', () => {
            test.each([
                { test: 'First name contains special characters', nameFirst: '$%^&*( ' },
                { test: 'First name contains numbers', nameFirst: '123456' },
                { test: 'First name is one character', nameFirst: 'S'},
                { test: 'First name is no characters', nameFirst: '' },
                { test: 'First name is greater than 20 characters', nameFirst: 'LOOOOOONNNNNNNNGGGGGGGGGGGNAAAAAAAMMMMMMEEEEEE' },

            ])("$test", ({ nameFirst }) => {
                expect(adminUserDetailsUpdate(user.authUserId, newEmail, nameFirst, newLastName)).toStrictEqual(ERROR_STRING);   
            })
        });

        describe('Last name cases', () => {
            test.each([
                { test: 'Last name contains special characters', nameLast: '$%^&*( ' },
                { test: 'Last name contains numbers', nameLast: '123456' },
                { test: 'Last name is one character', nameLast: 'S'},
                { test: 'Last name is no characters', nameLast: '' },
                { test: 'Last name is greater than 20 characters', nameLast: 'LOOOOOONNNNNNNNGGGGGGGGGGGNAAAAAAAMMMMMMEEEEEE' },
            ])("$test", ({ nameLast }) => {
                expect(adminUserDetailsUpdate(user.authUserId, newEmail, newFirstName, nameLast)).toStrictEqual(ERROR_STRING);   
            })
        });

    });
    describe.skip('Success Cases', () => {
        test('Successfully updates the new user details', () => {
            expect(adminUserDetailsUpdate(user.authUserId, newEmail, newFirstName, newLastName)).toStrictEqual({ });
            expect(adminUserDetails(user.authUserId)).toStrictEqual(
                {user: {
                    userId: user.authUserId,
                    name: newFirstName + ' ' + newLastName,
                    email: newEmail,
                    numSuccessfulLogins: 1,
                    numFailedPasswordsSinceLastLogin: 0,
                }
            });
        });
    });
});

// possible additional future cases
// Email is actually real and exists, not just valid
// Ensures that you can't 'update' by entering the exact same details
// 













