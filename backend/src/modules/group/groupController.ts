import express from 'express';
import {groupRepository} from "./groupRepository";
import CustomError from "../../utils/errorModel";

const groupRouter = express.Router();

/**
 * @openapi
 * '/api/group/getAllGroups':
 *   get:
 *     tags:
 *       - Groups
 *     operationId: getAllGroups
 *     responses:
 *       200:
 *         description: Success
 *       default:
 *         description: Error
 */
groupRouter.get('/getAllGroups', async (_, res) => {
    try {
        const groups = await groupRepository.listAllGroups();
        return res.status(201).json(groups);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.status).json({ error: error.message, code: error.status });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
});

groupRouter.get('/findUsersInGroup/:groupIdOrName', async(req, res) => {
    try {
        const { groupIdOrName } = req.params;
        const users = await groupRepository.findUsersInGroupByIdOrName(groupIdOrName);
        return res.status(201).json(users);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.status).json({ error: error.message, code: error.status });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * @openapi
 * '/api/group/':
 *  post:
 *     tags:
 *     - Groups
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateGroup'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Group'
 */
groupRouter.post('/' , async (req, res) => {
    try {
        const group = await groupRepository.createGroup(req.body);
        return res.status(200).json({ message: 'Group created successfully' }).json(group);
    } catch (e) {
        return res.status(500).json({ message: e });
    }
});

groupRouter.delete('/delete/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await groupRepository.deleteGroupByIdOrName(id);
        return res.status(201);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.status).json({ error: error.message, code: error.status });
        } 
        return res.status(500).json({ error: 'Internal server error' });
    }
});

groupRouter.post('/addUser', async(req, res) => {
    try {
        const {userId, groupIdOrName} = req.body
        await groupRepository.addUserToGroupByIdOrName(userId, groupIdOrName);
        return res.status(201);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.status).json({ error: error.message, code: error.status });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
});

groupRouter.put('/removeUser', async(req, res) => {
    try {
        const {userId, groupIdOrName} = req.body;
        await groupRepository.removeUserFromGroupByIdOrName(userId, groupIdOrName);
        return res.status(201);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.status).json({ error: error.message, code: error.status });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
});
groupRouter.put('/addAreaToGroup', async(req, res) => {
   try {
       const { area, groupIdOrName } = req.body;
       await groupRepository.addAreaToGroupByIdOrName(groupIdOrName, area);
       return res.status(201);
   } catch(error) {
       if (error instanceof CustomError) {
           return res.status(error.status).json({ error: error.message, code: error.status });
       }
       return res.status(500).json({ error: 'Internal server error' });
   }
});
export default groupRouter;