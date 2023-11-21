import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import CustomError from '../src/utils/errorModel';
import tokenRepository from '../src/modules/token/tokenRepository';

require('ts-node').register({
  project: '../tsconfig.json',
});

describe('tokenRepository_Server', () => {
  describe('createUser', () => {
    it('should get the specified token by id', async () => {
      const tokenId = '7';

      const result = await tokenRepository.getTokenById(tokenId);
      expect(result.id).to.equal(Number(tokenId));
    });
    it('should not get inexistent token by id', async () => {
      const tokenId = '99999';

      try {
        await tokenRepository.getTokenById(tokenId);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        if (error instanceof CustomError) {
          const expectedError = new CustomError(
            404,
            `Token with id:${tokenId}, not found`,
          );
          assert.equal(error.status, expectedError.status);
          assert.equal(error.message, expectedError.message);
        } else {
          throw new Error(`Unexpected error type: ${typeof error}`);
        }
      }
    });
  });
});
