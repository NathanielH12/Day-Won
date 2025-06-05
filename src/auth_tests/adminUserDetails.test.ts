import { adminUserDetails, adminAuthRegister, adminAuthLogin} from "../auth";
import { Register } from "../interface";
import { clear } from "../other";

let user: Register;
beforeEach(()=>{
  clear();
  user = adminAuthRegister('email@gmail.com', 'Password', 'Firstname', 'Lastname');
});

const ERROR_STRING = { error: expect.any(String) };


describe('AdminUserDetails', () => {
    describe('Success cases', () => {
        describe('General Cases', () => {
            test('Successfully returns user details', () => {
                expect(adminUserDetails(user.authUserId)).toStrictEqual({
                    user: {
                        userId: user.authUserId,
                        name: 'Firstname Lastname',
                        email: 'email@gmail.com',
                        numSuccessfulLogins: 1,
                        numFailedPasswordsSinceLastLogin: 0,
                    }
                });
            });
        });

        describe('numSuccessfulLogins Success Cases', () => {
            test('Successfully increments numSuccessfulLogins', () => {
                adminAuthLogin('email@gmail.com', 'Password');
                expect(adminUserDetails(user.authUserId)).toStrictEqual({
                    user: {
                        userId: user.authUserId,
                        name: 'Firstname Lastname',
                        email: 'email@gmail.com',
                        numSuccessfulLogins: 2,
                        numFailedPasswordsSinceLastLogin: 0,
                    }
                });
                adminAuthLogin('email@gmail.com', 'Password');
                adminAuthLogin('email@gmail.com', 'Password');
                expect(adminUserDetails(user.authUserId)).toStrictEqual({
                    user: {
                        userId: user.authUserId,
                        name: 'Firstname Lastname',
                        email: 'email@gmail.com',
                        numSuccessfulLogins: 4,
                        numFailedPasswordsSinceLastLogin: 0,
                    }
                });
            });
        });
        
        describe('numFailedPasswordsSinceLastLogin Success Cases', () => {
            test('Successfully increments numFailedPasswordsSinceLastLogin', () => {
                adminAuthLogin('email@gmail.com', 'Password');
                expect(adminUserDetails(user.authUserId)).toStrictEqual({
                    user: {
                        userId: user.authUserId,
                        name: 'Firstname Lastname',
                        email: 'email@gmail.com',
                        numSuccessfulLogins: 2,
                        numFailedPasswordsSinceLastLogin: 0,
                    }
                });
                adminAuthLogin('email@gmail.com', 'Password');
                adminAuthLogin('email@gmail.com', 'Password');
                expect(adminUserDetails(user.authUserId)).toStrictEqual({
                    user: {
                        userId: user.authUserId,
                        name: 'Firstname Lastname',
                        email: 'email@gmail.com',
                        numSuccessfulLogins: 4,
                        numFailedPasswordsSinceLastLogin: 0,
                    }
                });

            });
            test('Successfully resets numFailedPasswordsSinceLastLogin', () => {
                adminAuthLogin('email@gmail.com', 'wrongPassword');
                expect(adminUserDetails(user.authUserId)).toStrictEqual({
                    user: {
                        userId: user.authUserId,
                        name: 'Firstname Lastname',
                        email: 'email@gmail.com',
                        numSuccessfulLogins: 1,
                        numFailedPasswordsSinceLastLogin: 1,
                    }
                });
                adminAuthLogin('email@gmail.com', 'OfcourseWorng');
                adminAuthLogin('email@gmail.com', 'AbosolutelyWrong');
                expect(adminUserDetails(user.authUserId)).toStrictEqual({
                    user: {
                        userId: user.authUserId,
                        name: 'Firstname Lastname',
                        email: 'email@gmail.com',
                        numSuccessfulLogins: 1,
                        numFailedPasswordsSinceLastLogin: 3,
                    }
                });
            });
        });
    });

    describe('Error Cases', () => {
        describe('AuthUserId cases', () => {
            test('AuthUserId is invalid', () => {
                expect(adminUserDetails(user.authUserId + 1)).toStrictEqual(ERROR_STRING);
                expect(adminUserDetails(user.authUserId + 100)).toStrictEqual(ERROR_STRING);
                expect(adminUserDetails(user.authUserId + 200)).toStrictEqual(ERROR_STRING);
            });
        });
    });
});