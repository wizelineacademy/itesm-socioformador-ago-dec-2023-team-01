import { expect, assert } from 'chai';
import sinon from 'sinon';
import { PrismaClient } from '@prisma/client';
import { describe, before, beforeEach, after, afterEach, it } from 'mocha';
import CustomError from '../src/utils/errorModel';
import roleRepository from '../src/modules/role/roleRepository';

require('ts-node').register({
  project: '../tsconfig.json',
});

const prisma = new PrismaClient();

describe('roleRepository', () => {
  // Mock Prisma Client methods
  before(() => {
    sinon.stub(prisma.role, 'create');
    sinon.stub(prisma.role, 'findUnique');
  });

  after(() => {
    sinon.restore();
  });

  describe('createRole', () => {
    let prismaCreateStub: sinon.SinonStub;

    before(() => {
      // Create a Sinon stub for the Prisma function in a beforeEach hook
      prismaCreateStub = sinon.stub(prisma.role, 'create');
    });

    beforeEach(() => {
      // Resolve the stub with desired data in a beforeEach hook
      prismaCreateStub.resolves({
        id: 1,
        name: 'TestRole',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    it('should not create existing role', async () => {
      const roleInput = {
        name: 'TestRole',
        description: 'Test Description',
      };
      try {
        await roleRepository.createRole(roleInput);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        if (error instanceof CustomError) {
          const expectedError = new CustomError(409, 'Role already exists');
          assert.equal(error.status, expectedError.status);
          assert.equal(error.message, expectedError.message);
        } else {
          throw new Error(`Unexpected error type: ${typeof error}`);
        }
      }
    });

    afterEach(() => {
      prismaCreateStub.restore();
    });

    // Add more test cases for error handling and validation
  });

  describe('getRoleByIdOrName', () => {
    let prismaFindUniqueStub: sinon.SinonStub;

    beforeEach(() => {
      prismaFindUniqueStub = sinon.stub(prisma.role, 'findUnique');
    });

    it('should get a role by ID', async () => {
      const roleIdOrName = '3';

      // Resolve the stub with desired data in a beforeEach hook
      prismaFindUniqueStub.resolves({
        id: 3,
        name: 'testrole',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await roleRepository.getRoleByIdOrName(roleIdOrName);
      expect(result.id).to.equal(3);
      expect(result.name).to.equal('testrole');
      expect(result.description).to.equal('Test Description');
    });

    it('should recieve error when getting role by ID', async () => {
      const roleIdOrName = '9999';

      // Resolve the stub with desired data in a beforeEach hook
      prismaFindUniqueStub.resolves({
        id: 3,
        name: 'testrole',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      try {
        await roleRepository.getRoleByIdOrName(roleIdOrName);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        if (error instanceof CustomError) {
          const expectedError = new CustomError(
            404,
            'Role with id/name:9999, not found',
          );
          assert.equal(error.status, expectedError.status);
          assert.equal(error.message, expectedError.message);
        } else {
          throw new Error(`Unexpected error type: ${typeof error}`);
        }
      }
    });

    it('should get a role by name', async () => {
      const roleIdOrName = 'testrole';

      // Resolve the stub with desired data in a beforeEach hook
      prismaFindUniqueStub.resolves({
        id: 3,
        name: 'testrole',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await roleRepository.getRoleByIdOrName(roleIdOrName);
      expect(result.id).to.equal(3);
      expect(result.name).to.equal('testrole');
      expect(result.description).to.equal('Test Description');
    });

    it('should recieve error when getting role by name', async () => {
      const roleIdOrName = 'unusedName';

      // Resolve the stub with desired data in a beforeEach hook
      prismaFindUniqueStub.resolves({
        id: 3,
        name: 'testrole',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      try {
        await roleRepository.getRoleByIdOrName(roleIdOrName);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        if (error instanceof CustomError) {
          const expectedError = new CustomError(
            404,
            'Role with id/name:unusedName, not found',
          );
          assert.equal(error.status, expectedError.status);
          assert.equal(error.message, expectedError.message);
        } else {
          throw new Error(`Unexpected error type: ${typeof error}`);
        }
      }
    });

    afterEach(() => {
      prismaFindUniqueStub.restore();
    });
  });
  describe('getRoles', () => {
    let prismaFindManyStub = sinon.stub(prisma.role, 'findMany');

    beforeEach(() => {
      prismaFindManyStub = sinon.stub(prisma.role, 'findMany');
    });

    it('should get all roles', async () => {
      // Resolve the stub with desired data in a beforeEach hook
      prismaFindManyStub.resolves([
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
      const roles = await roleRepository.getRoles();
      expect(roles).to.be.an('array');
      expect(roles.length).to.equal(3);
      expect(roles[0].id).to.equal(1);
      expect(roles[0].name).to.equal('admin');
      expect(roles[0].description).to.equal(
        'Amin role with all permission on the app.',
      );
      expect(roles[1].id).to.equal(2);
      expect(roles[1].name).to.equal('wizeliner');
      expect(roles[1].description).to.equal(
        'Wizeliner role with basic permissions on the app.',
      );
      expect(roles[2].id).to.equal(3);
      expect(roles[2].name).to.equal('testrole');
      expect(roles[2].description).to.equal('Test Description');
    });

    afterEach(() => {
      prismaFindManyStub.restore();
    });
  });
});
