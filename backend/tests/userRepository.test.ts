import { assert } from 'chai';
import { describe, it } from 'mocha';
import { CreateUserInput } from '../src/modules/user/userModel';
import CustomError from '../src/utils/errorModel';
import userRepository from '../src/modules/user/userRepository';

require('ts-node').register({
  project: '../tsconfig.json',
});

describe('userRepository_Server', () => {
  const createdUserID: string = 'testID';

  describe('createUser', () => {
    it('should not create an existing user', async () => {
      const user: CreateUserInput = {
        id: createdUserID,
        firstName: 'testname',
        lastName: 'testlastname',
        imageUrl: '',
        email: 'test@gmail.com',
        roleId: 2,
      };

      try {
        await userRepository.createUser(user);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        if (error instanceof CustomError) {
          const expectedError = new CustomError(409, 'User already exists');
          assert.equal(error.status, expectedError.status);
          assert.equal(error.message, expectedError.message);
        } else {
          throw new Error(`Unexpected error type: ${typeof error}`);
        }
      }
    });
  });
});
