import { expect } from 'chai';
import { describe, it } from 'mocha';
import tokenRepository from '../src/modules/language/languageRepository';

require('ts-node').register({
  project: '../tsconfig.json',
});

describe('languagesRepository_Server', () => {
  describe('getLanguages', () => {
    it('should get all the languages', async () => {
      const result = await tokenRepository.getLanguages();
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].id).to.equal(1);
      expect(result[0].name).to.equal('gpt-3.5-turbo-0613');
      expect(result[0].createdAt.toISOString()).to.equal(
        '2023-11-08T20:02:53.076Z',
      );
      expect(result[0].updatedAt.toISOString()).to.equal(
        '2023-11-08T20:02:53.076Z',
      );
    });
  });
});
