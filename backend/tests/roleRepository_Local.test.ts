import { expect } from 'chai';
import sinon from 'sinon';
import { describe, beforeEach, afterEach, it } from 'mocha';
import roleRepository from '../src/modules/role/roleRepository';

require('ts-node').register({
  project: '../tsconfig.json',
});

describe('roleRepository_Local', () => {
  describe('getRoles', () => {
    let prismaFindManyStub: sinon.SinonStub;

    beforeEach(() => {
      prismaFindManyStub = sinon.stub(roleRepository, 'getRoles').resolves([
        {
          id: 1,
          name: 'Admin',
          description: 'Administrator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'User',
          description: 'Standard User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    });

    afterEach(() => {
      prismaFindManyStub.restore();
    });

    it('should get all roles', async () => {
      // Resolve the stub with desired data in a beforeEach hook
      const roles = await roleRepository.getRoles();
      expect(roles).to.be.an('array');
      expect(roles.length).to.equal(2);
      expect(roles[0].id).to.equal(1);
      expect(roles[0].name).to.equal('Admin');
      expect(roles[0].description).to.equal('Administrator');
      expect(roles[1].id).to.equal(2);
      expect(roles[1].name).to.equal('User');
      expect(roles[1].description).to.equal('Standard User');
    });
  });
});
