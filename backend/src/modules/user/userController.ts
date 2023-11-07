import express, { Request, Response } from 'express';
import CustomError from '../../utils/errorModel';
import userRepository from './userRepository';
import roleRepository from '../role/roleRepository';
import { User } from './userModel';
import userService from './userService';

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
      res.status(500).json({ message: 'Internal server error', error });
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
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
});

/**
 * @openapi
 * '/api/users/':
 *  get:
 *     tags:
 *       - Users
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
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
});

/**
 * @openapi
 * '/api/users/{userId}/tokens':
 *  get:
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Get user tokens by Id
 *         required: true
 *     responses:
 *      200:
 *        description: Success
 */
userRouter.get('/:userId/tokens', async (req: Request, res: Response) => {
  try {
    const tokens = await userRepository.getUserTokens(req.params.userId);
    res.status(200).json(tokens);
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
 * '/api/users/{userId}/current-tokens':
 *  get:
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Get user current tokens by Id
 *         required: true
 *     responses:
 *      200:
 *        description: Success
 */
userRouter.get(
  '/:userId/current-tokens',
  async (req: Request, res: Response) => {
    try {
      const tokens = await userService.getUserCurrentTokens(req.params.userId);
      res.status(200).json(tokens ?? {});
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.status)
          .json({ error: error.message, code: error.status });
      } else {
        res.status(500).json({ message: 'Internal server error', error });
      }
    }
  },
);
export default userRouter;
