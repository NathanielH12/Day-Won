import { adminAuthLogin, adminUserDetails } from '../auth';
import { adminAuthRegister } from '../auth';
import { clear } from '../other';

beforeEach(()=> {
  clear();
})

const ERROR_STRING = { error: expect.any(String) };
const SUCCESS = { authUserId: expect.any(Number) }

describe.skip('AdminAuthLogin', () => {
  beforeEach(() => {
    adminAuthRegister('userone@gmail.com', 'User1Password', 'User', 'One');
  });

  describe('Error cases', () => {
    test.each([
      { test: 'No user with this email address.', email: 'wrong@gmail.com', password: 'User1Password' },
      { test: 'Extra characters in email address.', email: 'userone!@gmail.com', password: 'User1Password' },
      { test: 'Extra characters at end of email address.', email: 'userone@gmail.com.', password: 'User1Password' },
      { test: 'Wrong password for this email.', email: 'userone@gmail.com', password: 'wrongpassword' },
      { test: 'Spaces before email address.', email: ' userone@gmail.com', password: 'User1Password' },
      { test: 'Spaces after email address.', email: 'userone@gmail.com ', password: 'User1Password' },
      { test: 'Spaces in middle of email address.', email: 'userone @gmail.com', password: 'User1Password' },
      { test: 'Spaces before password.', email: 'userone@gmail.com', password: ' User1Password' },
      { test: 'Spaces after password.', email: 'userone@gmail.com', password: 'User1Password ' },
      { test: 'Spaces in middle of password.', email: 'userone@gmail.com', password: 'User 1Password' },
    ])("$test", ({ email, password }) => {
      const result = adminAuthLogin(email, password);
      expect(result).toStrictEqual(ERROR_STRING);
    });
  });

  describe('Success cases', () => {
    test('Successfully logs in', () => {
      adminAuthRegister('user@gmail.com', 'ProjectWorkup123', 'User', 'One');
      const result = adminAuthLogin('user@gmail.com', 'ProjectWorkup123');
      expect(result).toStrictEqual(SUCCESS);
    });

    test('Successfully logs in with case-insensitive email', () => {
      adminAuthRegister('user@gmail.com', 'ProjectWorkup123', 'User', 'One');
      const result = adminAuthLogin('USER@gmail.com', 'ProjectWorkup123');
      expect(result).toStrictEqual(SUCCESS);
    });

    test('Successfully logs in multiple users', () => {
      adminAuthRegister('usertwo@gmail.com', 'ProjectWorkup321', 'User', 'Two');
      const result1 = adminAuthLogin('userone@gmail.com', 'User1Password');
      expect(result1).toStrictEqual(SUCCESS);
      const result2 = adminAuthLogin('usertwo@gmail.com', 'ProjectWorkup321');
      expect(result2).toStrictEqual(SUCCESS);
    });

    describe('Login count tracking', () => {
      test('Number of successful logins increases', () => {
        const res1 = adminAuthLogin('userone@gmail.com', 'User1Password');
        expect(res1).toStrictEqual(SUCCESS);

        const data1 = adminUserDetails(res1.authUserId);
        expect(data1.user.email).toStrictEqual('userone@gmail.com');
        expect(data1.user.numSuccessfulLogins).toStrictEqual(2);

        const res2 = adminAuthLogin('userone@gmail.com', 'User1Password');
        expect(res2).toStrictEqual(SUCCESS);

        const data2 = adminUserDetails(res2.authUserId);
        expect(data2.user.email).toStrictEqual('userone@gmail.com');
        expect(data2.user.numSuccessfulLogins).toStrictEqual(3);
      });

      test('Number of failed passwords resets to 0 after successful login', () => {
        const res1 = adminAuthLogin('userone@gmail.com', 'WrongPassword');
        expect(res1).toStrictEqual(ERROR_STRING);

        const res2 = adminAuthLogin('userone@gmail.com', 'User1Password');
        expect(res2).toStrictEqual(SUCCESS);

        const data2 = adminUserDetails(res2.authUserId);
        expect(data2.user.email).toStrictEqual('userone@gmail.com');
        expect(data2.user.numFailedPasswordsSinceLastLogin).toStrictEqual(0);
      });
    });
  });
});
  