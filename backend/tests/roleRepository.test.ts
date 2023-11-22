import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import CustomError from '../src/utils/errorModel';
import roleRepository from '../src/modules/role/roleRepository';

require('ts-node').register({
  project: '../tsconfig.json',
});

describe('roleRepository_Server', () => {
  describe('createRole', () => {
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
  });

  describe('getRoleById', () => {
    it('should get a role by ID', async () => {
      const roleId = 3;

      const result = await roleRepository.getRoleById(roleId);
      expect(result.id).to.equal(roleId);
      expect(result.name).to.equal('testrole');
      expect(result.description).to.equal('Test Description');
    });

    it('should recieve error when getting role by ID', async () => {
      const roleId = 9999;

      try {
        await roleRepository.getRoleById(roleId);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        if (error instanceof CustomError) {
          const expectedError = new CustomError(
            404,
            `Role with id:${roleId}, not found`,
          );
          assert.equal(error.status, expectedError.status);
          assert.equal(error.message, expectedError.message);
        } else {
          throw new Error(`Unexpected error type: ${typeof error}`);
        }
      }
    });
  });
  describe('getRoleByName', () => {
    it('should get a role by name', async () => {
      const roleName = 'testrole';

      const result = await roleRepository.getRoleByName(roleName);
      expect(result.id).to.equal(3);
      expect(result.name).to.equal(roleName);
      expect(result.description).to.equal('Test Description');
    });

    it('should recieve error when getting role by name', async () => {
      const roleName = 'unusedName(fd15ec06-7fda-11ee-b962-0242ac120002)';

      try {
        await roleRepository.getRoleByName(roleName);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        if (error instanceof CustomError) {
          const expectedError = new CustomError(
            404,
            `Role with name:${roleName}, not found`,
          );
          assert.equal(error.status, expectedError.status);
          assert.equal(error.message, expectedError.message);
        } else {
          throw new Error(`Unexpected error type: ${typeof error}`);
        }
      }
    });
  });
  describe('getRoles', () => {
    it('should get all roles', async () => {
      const roles = await roleRepository.getRoles();
      expect(roles).to.be.an('array');
      expect(roles.length).to.equal(3);
      expect(roles[0].id).to.equal(1);
      expect(roles[0].name).to.equal('admin');
      expect(roles[0].description).to.equal('Admin role with all permissions.');
      expect(roles[1].id).to.equal(2);
      expect(roles[1].name).to.equal('wizeliner');
      expect(roles[1].description).to.equal(
        'Wizeliner role with basic permissions.',
      );
      expect(roles[2].id).to.equal(3);
      expect(roles[2].name).to.equal('testrole');
      expect(roles[2].description).to.equal('Test Description');
    });
  });
});
