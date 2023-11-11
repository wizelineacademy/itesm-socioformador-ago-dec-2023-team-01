import express from 'express';
import { groupRepository } from './groupRepository';
import CustomError from '../../utils/errorModel';
import { groupService } from './groupService';

const groupRouter = express.Router();

/**
 * @openapi
 * '/api/group/getAllGroups':
 *  get:
 *     tags:
 *       - Groups
 *     operationId: getAllGroups
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
groupRouter.get('/getAllGroups', async (_req, res) => {
  try {
    const groups = await groupService.getTotalTokensForGroup();
    res.status(200).json(groups);
  } catch (error) {
    if (error instanceof CustomError) {
      res
        .status(error.status)
        .json({ error: error.message, code: error.status });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});
/**
 * @openapi
 * '/api/group/findUsersInGroup/{groupIdOrName}':
 *  get:
 *     tags:
 *       - Groups
 *     operationId: getUsersInGroup
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - name: groupIdOrName
 *        in: path
 *        required: true
 *        description: ID or name of the group to get users from
 *     schema:
 *      type: string
 *     responses:
 *       201:
 *         description: Success
 *       default:
 *         description: Error
 */
groupRouter.get('/findUsersInGroup/:groupIdOrName', async (req, res) => {
  try {
    const { groupIdOrName } = req.params;
    const users =
      await groupRepository.findUsersInGroupByIdOrName(groupIdOrName);
    res.status(201).json(users);
  } catch (error) {
    if (error instanceof CustomError) {
      res
        .status(error.status)
        .json({ error: error.message, code: error.status });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});
/**
 * @openapi
 * '/api/group/':
 *  post:
 *     tags:
 *       - Groups
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateGroup'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Group'
 */
groupRouter.post('/', async (req, res) => {
  try {
    const group = await groupRepository.createGroup(req.body);
    res.status(200).json({ message: 'Group created successfully', group });
  } catch (error) {
    if (error instanceof CustomError) {
      res
        .status(error.status)
        .json({ error: error.message, code: error.status });
    } else {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
});
/**
 * @openapi
 * '/api/group/delete/{id}':
 *   delete:
 *     tags:
 *       - Groups
 *     operationId: deleteGroup
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the group to delete
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Group deleted successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal server error
 */
groupRouter.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await groupRepository.deleteGroupByIdOrName(id);
    res.status(201).json({ message: 'Group deleted successfully' });
  } catch (error) {
    if (error instanceof CustomError) {
      res
        .status(error.status)
        .json({ error: error.message, code: error.status });
    } else {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
});
/**
 * @openapi
 * '/api/group/addUser':
 *   post:
 *     tags:
 *       - Groups
 *     operationId: addUserToGroup
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User and group information to add to the group
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to add
 *               groupIdOrName:
 *                 type: string
 *                 description: The ID or name of the group to which the user will be added
 *     responses:
 *       201:
 *         description: User added to the group successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       404:
 *         description: Group or user not found
 *       500:
 *         description: Internal server error
 */
groupRouter.post('/addUser', async (req, res) => {
  try {
    const { userId, groupIdOrName } = req.body;
    const updateGroup = await groupRepository.addUserToGroupByIdOrName(
      groupIdOrName,
      userId,
    );
    res.status(201).json({ message: 'added user to group: ', updateGroup });
  } catch (error) {
    if (error instanceof CustomError) {
      res
        .status(error.status)
        .json({ error: error.message, code: error.status });
    } else {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
});
/**
 * @openapi
 * '/api/group/removeUser':
 *   put:
 *     tags:
 *       - Groups
 *     operationId: removeUserFromGroup
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User and group information to remove from the group
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to add
 *               groupIdOrName:
 *                 type: string
 *                 description: The ID or name of the group to which the user will be added
 *     responses:
 *       201:
 *         description: User added to the group successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       404:
 *         description: Group or user not found
 *       500:
 *         description: Internal server error
 */
groupRouter.put('/removeUser', async (req, res) => {
  try {
    const { userId, groupIdOrName } = req.body;
    await groupRepository.removeUserFromGroupByIdOrName(userId, groupIdOrName);
    res.status(201).json({ message: 'User removed from group successfully' });
  } catch (error) {
    if (error instanceof CustomError) {
      res
        .status(error.status)
        .json({ error: error.message, code: error.status });
    }
    res.status(500).json({ message: 'Internal server error', error });
  }
});
/**
 * @openapi
 * '/api/group/addAreaToGroup':
 *   put:
 *     tags:
 *       - Groups
 *     operationId: addAreaToGroup
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Group information to add area
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               area:
 *                 type: string
 *                 description: The area to add
 *               groupIdOrName:
 *                 type: string
 *                 description: The ID or name of the group to which the area will be added
 *     responses:
 *       201:
 *         description: User added to the group successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       404:
 *         description: Group or user not found
 *       500:
 *         description: Internal server error
 */
groupRouter.put('/addAreaToGroup', async (req, res) => {
  try {
    const { area, groupIdOrName } = req.body;
    const updated = await groupRepository.addAreaToGroupByIdOrName(
      groupIdOrName,
      area,
    );
    res.status(201).json(updated);
  } catch (error) {
    if (error instanceof CustomError) {
      res
        .status(error.status)
        .json({ error: error.message, code: error.status });
    } else {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
});
/**
 * @openapi
 * '/api/group/{id}/tokens':
 *   patch:
 *     tags:
 *       - Groups
 *     operationId: setTokensToGroup
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      description: Group information to add tokens
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/GroupTokens'
 *     responses:
 *       200:
 *         description: Tokens set successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal server error
 */
groupRouter.patch('/:id/tokens', async (req, res) => {
  try {
    await groupService.setTokensToUsersFromGroup(
      req.body.groupId,
      Number(req.body.amount),
    );
    res.status(200).json({ message: 'Tokens set to group successfully' });
  } catch (error) {
    if (error instanceof CustomError) {
      res
        .status(error.status)
        .json({ error: error.message, code: error.status });
    } else {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
});
export default groupRouter;
