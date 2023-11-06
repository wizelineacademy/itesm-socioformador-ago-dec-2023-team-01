import express, { Request, Response } from 'express';
import CustomError from '../../utils/errorModel';
import userRepository from './userRepository';
import roleRepository from '../role/roleRepository';
import { User } from './userModel';

const userRouter = express.Router();

/**
 * @openapi
 * '/api/users/':
 *  post:
 *     tags:
 *     - Users
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUser'
 *     responses:
 *      200:
 *        description: Success
 */
userRouter.post('/', async (req: Request, res: Response) => {
  try {
    const user = await userRepository.createUser(req.body);
    res.status(200).json(user);
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
 * '/api/users/{userId}':
 *  get:
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Get user by Id
 *         required: true
 *     responses:
 *      200:
 *        description: Success
 */
userRouter.get('/:userId', async (req: Request, res: Response) => {
  try {
    const user = await userRepository.getUserById(req.params.userId);
    const role = await roleRepository.getRoleByIdOrName(user.roleId.toString());
    const newUser: User = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: role.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? new Date(),
    };
    res.status(200).json(newUser);
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
 * '/api/users/':
 *  get:
 *     tags:
 *       - Users
 *     requestBody:
 *      required: true
 *     parameters:
 *        - userId: userId
 *     responses:
 *      200:
 *        description: Success
 */
userRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await userRepository.getUsers();
    res.status(200).json(users);
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
 * '/api/users/makeAdmin':
 *  patch:
 *     tags:
 *     - Users
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/MakeAdminInput'
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */
userRouter.patch('/makeAdmin', async (req: Request, res: Response) => {
  try {
    const user = await userRepository.makeAdmin(
      req.body.userId,
      req.body.isAdmin,
    );
    res.status(200).json(user);
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
export default userRouter;
