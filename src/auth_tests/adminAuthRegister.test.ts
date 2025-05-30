import { adminAuthRegister } from "../auth";
import { clear } from "../quiz";

beforeEach(()=> {
  clear();
})

const ERROR_STRING = { error: expect.any(String) };
const SUCCESS = { authUserId: expect.any(Number) }

describe('AdminAuthRegister', () => {
  describe('Error cases', () => {
    test.each([
      {test: 'Email address is not valid', email: 'fakeEmail.com', password: 'projectworkup123', nameFirst: 'Nathan', nameLast: 'Hendra'},
      {test: 'First name contains invalid characters.', email: 'nathaniel@gmail.com', password: 'projectworkup123', nameFirst: 'Nathan!', nameLast: 'Hendra'},
      {test: 'First name contains numbers.', email: 'nathaniel@gmail.com', password: 'projectworkup123', nameFirst: 'N4than', nameLast: 'Hendra'},
      {test: 'First name is less than 2 characters.', email: 'nathaniel@gmail.com', password: 'projectworkup123', nameFirst: 'N', nameLast: 'Hendra'},
      {test: 'First name is more than 20 characters.', email: 'nathaniel@gmail.com', password: 'projectworkup123', nameFirst: 'Nathanielovertwentyletters', nameLast: 'Hendra'},
      {test: 'Last name contains invalid characters.', email: 'nathaniel@gmail.com', password: 'projectworkup123', nameFirst: 'Nathan', nameLast: 'Hendra!'},
      {test: 'Last name contains numbers.', email: 'nathaniel@gmail.com', password: 'projectworkup123', nameFirst: 'Nathan', nameLast: 'H3ndra'},
      {test: 'Last name is less than 2 characters.', email: 'nathaniel@gmail.com', password: 'projectworkup123', nameFirst: 'Nathan', nameLast: 'H'},
      {test: 'Last name is more than 20 characters.', email: 'nathaniel@gmail.com', password: 'projectworkup123', nameFirst: 'Nathan', nameLast: 'Hendraovertwentyletterss'},
      {test: 'Password is less than 8 characters.', email: 'nathaniel@gmail.com', password: 'pro1', nameFirst: 'Nathan', nameLast: 'Hendra'},
      {test: 'Password is less than 8 characters.', email: 'nathaniel@gmail.com', password: 'Project', nameFirst: 'Nathan', nameLast: 'Hendra'},
      {test: 'Password does not contain at least one number.', email: 'nathaniel@gmail.com', password: 'Computersci', nameFirst: 'Nathan', nameLast: 'Hendra'},
      {test: 'Password does not contain at least one letter.', email: 'nathaniel@gmail.com', password: '123456789', nameFirst: 'Nathan', nameLast: 'Hendra'},
      {test: 'Password does not contain at least one number and at least one letter.', email: 'nathaniel@gmail.com', password: '!!!!!!!!!$%', nameFirst: 'Nathan', nameLast: 'Hendra'},
    ])("$test", ({email, password, nameFirst, nameLast}) => {
      expect(adminAuthRegister(email, password, nameFirst, nameLast)).toStrictEqual(ERROR_STRING)
    });
    test('Email is taken by another user.', () => {
      adminAuthRegister('nathaniel@gmail.com', 'projectworkup123', 'Nathan', 'Hendra');
      const repeatemail = adminAuthRegister('nathaniel@gmail.com', 'differentPassword123', 'Nathan', 'Hendra');
      expect(repeatemail).toStrictEqual(ERROR_STRING)
    });
    test('AuthUserId is unique.', () => {
      const user1 = adminAuthRegister('nathaniel@gmail.com', 'projectworkup123', 'Nathan', 'Hendra');
      const user2 = adminAuthRegister('hayden@email.com', 'projectworkup123', 'Hayden', 'Fu');
      expect(user1).not.toStrictEqual(user2);
    });
});

  describe('Success cases', () => {
    test('Successfully registers a user', () => {
      const result = adminAuthRegister('nathaniel@gmail.com', 'projectworkup123', 'Nathan', 'Hendra');
      expect(result).toStrictEqual(SUCCESS);
    });

    test('Successfully registers multiple users', () => {
      const user1 = adminAuthRegister('nathaniel@gmail.com', 'projectworkup123', 'NathanH', 'Hendra');
      expect(user1).toStrictEqual(SUCCESS);
      const user2 = adminAuthRegister('hendra@gmail.com', 'projectworkup312', 'Nathaniel', 'Hendra');
      expect(user2).toStrictEqual(SUCCESS);
      const user3= adminAuthRegister('nathanielHendra@gmail.com', 'projectworkup321', 'NathanLan', 'Hendranoniam');
      expect(user3).toStrictEqual(SUCCESS);
      const user4 = adminAuthRegister('nathanielbenten@gmail.com', 'projectworkup132', 'NathanTan', 'Hendra');
      expect(user4).toStrictEqual(SUCCESS);
    });
  });
});
