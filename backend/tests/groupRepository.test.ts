import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import { createGroupInput } from '../src/modules/group/groupModel';
import groupRepository from '../src/modules/group/groupRepository';
import CustomError from '../src/utils/errorModel';

require('ts-node').register({
  project: '../tsconfig.json',
});

describe('groupRepository_Server', () => {
  let createdGroupID: number;

  describe('createGroup', () => {
    it('should create a group', async () => {
      const group: createGroupInput = { name: 'testgroup' };
      const returnVal = await groupRepository.createGroup(group);
      createdGroupID = returnVal.id;
      expect(returnVal.name).to.equal('testgroup');
      expect(returnVal.area).to.equal('');
    });
  });
  describe('addAreaToGroupById', () => {
    it("should change a group's area", async () => {
      const returnVal = await groupRepository.addAreaToGroupById(
        createdGroupID,
        'dev',
      );
      expect(returnVal?.name).to.equal('testgroup');
      expect(returnVal?.area).to.equal('dev');
    });
  });
  describe('deleteGroup', () => {
    it('should delete the created group', async () => {
      const returnVal = await groupRepository.deleteGroupById(createdGroupID);
      expect(returnVal?.name).to.equal('testgroup');
      expect(returnVal?.area).to.equal('dev');
    });
  });
  describe('listAllGroups', () => {
    it('should get all groups', async () => {
      const groups = await groupRepository.listAllGroups();
      expect(groups).to.be.an('array');
      expect(groups.length).to.equal(4);
      expect(groups[0].id).to.equal(12);
      expect(groups[0].name).to.equal("sam's team");
      expect(groups[0].area).to.equal('development');
      expect(groups[0].createdAt.toISOString()).to.equals(
        '2023-11-10T18:00:12.318Z',
      );
      expect(groups[0].updatedAt?.toISOString()).to.equals(
        '2023-11-10T18:00:12.318Z',
      );
    });
  });
  describe('findUsersInGroupById', () => {
    it('should get all users in a group', async () => {
      const groupID = 8;
      const groups = await groupRepository.findUsersInGroupById(groupID);
      expect(groups).to.be.an('array');
      expect(groups.length).to.equal(1);
      expect(groups[0].id).to.equal('google-oauth2|110273456643017657010');
      expect(groups[0].firstName).to.equal('samuel');
      expect(groups[0].lastName).to.equal('acosta');
      expect(groups[0].roleId).to.equal(1);
    });
    it('should not get user in inexistent group', async () => {
      const groupID = 9999;
      try {
        await groupRepository.findUsersInGroupById(groupID);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        if (error instanceof CustomError) {
          const expectedError = new CustomError(
            404,
            `Group with id ${groupID} not found`,
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
