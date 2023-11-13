import express, { Request, Response } from 'express';
import { groupRepository } from './groupRepository';
import CustomError from '../../utils/errorModel';
import { groupService } from './groupService';

const groupRouter = express.Router();

/**
 * @openapi
 * '/api/group/':
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
groupRouter.get('/', async (_req, res) => {
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
 * '/api/group/{groupId}/users':
 *  get:
 *     tags:
 *       - Groups
 *     operationId: getUsersInGroup
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - name: groupId
 *        in: path
 *        required: true
 *        description: ID of the group to get users from
 *     schema:
 *      type: integer
 *     responses:
 *       200:
 *         description: Success
 *       default:
 *         description: Error
 */
groupRouter.get('/:groupId/users', async (req, res) => {
  try {
    const { groupId } = req.params;
    const users = await groupRepository.findUsersInGroupById(Number(groupId));
    res.status(200).json(users);
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
 * '/api/group/{id}':
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
groupRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await groupRepository.deleteGroupById(Number(id));
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
 * '/api/group/{groupId}/user':
 *   post:
 *     tags:
 *       - Groups
 *     operationId: addUserToGroup
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         description: The ID of the group to which the user will be added
 *         schema:
 *           type: integer
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
groupRouter.post('/:groupId/user', async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const updateGroup = await groupRepository.addUserToGroupById(
      Number(groupId),
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
 * '/api/group/{groupId}/user/{userId}':
 *   delete:
 *     tags:
 *       - Groups
 *     operationId: removeUserFromGroup
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         description: The ID of the group to which the user will be removed
 *         schema:
 *           type: integer
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to be removed
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: User removed to the group successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       404:
 *         description: Group or user not found
 *       500:
 *         description: Internal server error
 */
groupRouter.delete('/:groupId/user/:userId', async (req: Request, res) => {
  try {
    const { userId, groupId } = req.params;
    await groupRepository.removeUserFromGroupById(userId, Number(groupId));
    res.status(201).json({ message: 'User removed from group successfully' });
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
 * '/api/group/{groupId}/area':
 *   patch:
 *     tags:
 *       - Groups
 *     operationId: addAreaToGroup
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         description: The ID of the group to which the area will be added
 *         schema:
 *           type: integer
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
groupRouter.patch('/:groupId/area', async (req: Request, res) => {
  try {
    const { groupId } = req.params;
    const { area } = req.body;
    const updated = await groupRepository.addAreaToGroupById(
      Number(groupId),
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
