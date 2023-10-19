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
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostResponse'
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

// userRouter.get('/create', async (req, res) => {
//   try {
//     console.info('Creating', req.oidc.user, req.oidc.isAuthenticated());
//     if (req.oidc.isAuthenticated()) {
//       const authUser = req.oidc.user;
//       const user = await getUserByAuth0Id(authUser?.sub);
//       if (user !== null) {
//         return res.redirect('http://localhost:8080/');
//       }
//       if (authUser) {
//         await createUser({
//           id: authUser.sub,
//           email: authUser.email,
//           name: authUser.given_name,
//           lastName: authUser.family_name,
//         });
//         return res.redirect('http://localhost:8080/');
//       }
//     } else {
//       return res.status(401).json({ message: 'User is not authenticated' });
//     }
//   } catch (error) {
//     console.error('Error creating user:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
//   return res.status(201);
// });

export default userRouter;
