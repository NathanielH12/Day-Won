// import { adminAuthRegister, adminUserPasswordUpdate } from '../auth';
// import { adminTimerCreate, adminTimerDurationUpdate } from '../timer';
// import { clear } from '../other';

// beforeEach(() => {
//     clear();
// });

describe.skip('adminTimerDurationUpdate', () => {
    describe('Error Cases', () => {
        test.skip('Blahblah', () => {

        });
    });
});
// let userIdValid: number;
// let timerIdValid: number;

// beforeEach(() => {
//     userIdValid = adminAuthRegister('valid@mail.com', 'VeryValidPassword12!', 'validFirst', 'validLast').authUserId;
//     timerIdValid = adminTimerCreate(userIdValid, 'valid timer', 0, 30).timerId;
// });

// describe('Error Cases', () => {
//     test('Invalid UserId', () => {
//         const userIdInvalid = userIdValid + 1;
//         expect(adminTimerDurationUpdate(userIdInvalid, timerIdValid, 0, 45)).toStrictEqual({ error: expect.any(String) });
//     });

//     test('Old Password is not the correct old password', () => {
//         expect(adminUserPasswordUpdate(userIdValid, 'InvalidPassword1', 'VeryValidPassword2')).toStrictEqual({ error: expect.any(String) });
//     });

//     test('Old Password and New Password match exactly', () => {
//         expect(adminUserPasswordUpdate(userIdValid, 'VeryValidPassword12!', 'VeryValidPassword12!')).toStrictEqual({ error: expect.any(String) });
//     });

//     test('New Password has already been used before by this user', () => {
//         // Successfully changes password to Val!dPassword2
//         expect(adminUserPasswordUpdate(userIdValid, 'VeryValidPassword12!', 'VeryValidPassword2!!')).toStrictEqual({});
//         // Successfully changes password to Val!dPassword3
//         expect(adminUserPasswordUpdate(userIdValid, 'VeryValidPassword2!!', 'VeryValidPassword3!!!')).toStrictEqual({});
//         // Should fail to change password back to Val!dPassword2
//         expect(adminUserPasswordUpdate(userIdValid, 'VeryValidPassword3!!!', 'VeryValidPassword2!!')).toStrictEqual({ error: expect.any(String) });
//         // Should also fail to change password to Val!dPassword1
//         expect(adminUserPasswordUpdate(userIdValid, 'VeryValidPassword3!!!', 'VeryValidPassword12!')).toStrictEqual({ error: expect.any(String) });
//     });

//     test.each([
//         { test: 'at least one number', oldPassword: 'VeryValidPassword1', newPassword: 'invalidPwd' },
//         { test: 'at least one letter', oldPassword: 'VeryValidPassword1', newPassword: '123456789' },
//         { test: 'at least 8 characters', oldPassword: 'VeryValidPassword1', newPassword: 'ValidP1' }
//     ])('New Password does not have: $test', ({ oldPassword, newPassword }) => {
//         expect(adminUserPasswordUpdate(userIdValid, oldPassword, newPassword)).toStrictEqual({ error: expect.any(String) });
//     });

//     test.each([
//         { oldPassword: 'VeryValidPassword1', newPassword: 'qwerty123' },
//         { oldPassword: 'VeryValidPassword1', newPassword: 'password1' },
//         { oldPassword: 'VeryValidPassword1', newPassword: '1q2w3e4r5t' },
//         { oldPassword: 'VeryValidPassword1', newPassword: '1q2w3e4r' },
//     ])('New Password is valid but is too common(according to Nordpass, NSCS and Keeper)', ({ oldPassword, newPassword }) => {
//         expect(adminUserPasswordUpdate(userIdValid, oldPassword, newPassword)).toStrictEqual({ error: expect.any(String) });
//     });
// });

// describe('Success Cases', () => {
//     test.each([
//         { test: 'mainly letters', oldPassword: 'VeryValidPassword12!', newPassword: 'VeryValidPassword2' },
//         { test: 'special characters', oldPassword: 'VeryValidPassword12!', newPassword: 'VeryValidPassword!123' }
//     ])('Password successfully updated: $test', ({ oldPassword, newPassword }) => {
//         expect(adminUserPasswordUpdate(userIdValid, oldPassword, newPassword)).toStrictEqual({});
//     });
// });

// });
