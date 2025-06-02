import { adminUserPasswordUpdate, adminAuthRegister } from '../auth';
import { clear } from '../other';

beforeEach(() => {
    clear();
});

describe('adminUserPasswordUpdate', () => {
    let userIdValid: number;
    
    beforeEach(() => {
        userIdValid = adminAuthRegister('valid@mail.com', 'ValidPassword1', 'validFirst', 'validLast').authUserId;
    });

    describe('Error Cases', () => {
        test('Invalid UserId', () => {
            let userIdInvalid = userIdValid + 1;
            expect(adminUserPasswordUpdate(userIdInvalid, 'ValidPassword1', 'ValidPassword2')).toStrictEqual({ error: expect.any(String) });
        });

        test('Old Password is not the correct old password', () => {
            expect(adminUserPasswordUpdate(userIdValid, 'InvalidPassword1', 'ValidPassword2')).toStrictEqual({ error: expect.any(String) });
        });

        test('Old Password and New Password match exactly', () => {
            expect(adminUserPasswordUpdate(userIdValid, 'ValidPassword1', 'ValidPassword1')).toStrictEqual({ error: expect.any(String) });
        });

        test('New Password has already been used before by this user', () => {
            // Successfully changes password to Val!dPassword2
            expect(adminUserPasswordUpdate(userIdValid, 'ValidPassword1', 'ValidPassword2')).toStrictEqual({});
            // Successfully changes password to Val!dPassword3
            expect(adminUserPasswordUpdate(userIdValid, 'ValidPassword2', 'ValidPassword3')).toStrictEqual({});
            // Should fail to change password back to Val!dPassword2
            expect(adminUserPasswordUpdate(userIdValid, 'ValidPassword3', 'ValidPassword2')).toStrictEqual({ error: expect.any(String) });
            // Should also fail to change password to Val!dPassword1
            expect(adminUserPasswordUpdate(userIdValid, 'ValidPassword3', 'ValidPassword1')).toStrictEqual({ error: expect.any(String) });
        });

        test.each([
            { test: 'at least one number', oldPassword: 'ValidPassword1', newPassword: 'invalidPwd' },
            { test: 'at least one letter', oldPassword: 'ValidPassword1', newPassword: '123456789' },
            { test: 'at least 8 characters', oldPassword: 'ValidPassword1', newPassword: 'ValidP1' }
        ])('New Password does not have: $test', ({ oldPassword, newPassword }) => {
            expect(adminUserPasswordUpdate(userIdValid, oldPassword, newPassword)).toStrictEqual({ error: expect.any(String) });
        });

        test.each([
            { oldPassword: 'ValidPassword1', newPassword: 'qwerty123' },
            { oldPassword: 'ValidPassword1', newPassword: 'password1' },
            { oldPassword: 'ValidPassword1', newPassword: '1q2w3e4r5t' },
            { oldPassword: 'ValidPassword1', newPassword: '1q2w3e4r' },
        ])('New Password is valid but is too common(according to Nordpass, NSCS and Keeper)', ({ oldPassword, newPassword }) => {
            expect(adminUserPasswordUpdate(userIdValid, oldPassword, newPassword)).toStrictEqual({ error: expect.any(String) });
        });
    });

    describe('Success Cases', () => {
        test.each([
            { test: 'mainly letters', oldPassword: 'ValidPassword1', newPassword: 'ValidPassword2' },
            { test: 'mainly numbers', oldPassword: 'ValidPassword1', newPassword: '12345678P' },
            { test: 'special characters', oldPassword: 'ValidPassword1', newPassword: 'ValidPassword!' }
        ])('Password successfully updated: $test', ({ oldPassword, newPassword }) => {
            expect(adminUserPasswordUpdate(userIdValid, oldPassword, newPassword)).toStrictEqual({});
        });
    });
});
