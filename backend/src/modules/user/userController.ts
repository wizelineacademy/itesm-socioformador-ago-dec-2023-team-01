import express, { Request, Response } from 'express';
import CustomError from '../../utils/errorModel';
import userRepository from './userRepository';
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
    const user = await userService.getUserById(req.params.userId);
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
    const tokens = await userService.getUserTokens(req.params.userId);
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

/**
 * @openapi
 * '/api/users/{userId}/conversations':
 *  get:
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Get conversations of user by Id
 *         required: true
 *     responses:
 *      200:
 *        description: Success
 */
userRouter.get(
  '/:userId/conversations',
  async (req: Request, res: Response) => {
    try {
      const conversations = await userRepository.getConversationsOfUser(
        req.params.userId,
      );
      res.status(200).json(conversations);
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
