import express from 'express';
import { createUser, getUserByAuth0Id } from './userService';

const userRouter = express.Router();

/**
 * @openapi
 * '/api/users/':
 *  post:
 *     tags:
 *     - Roles
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateRole'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Role'
 */
userRouter.post('/', async (req: Request, res: Response) => {
  try {
    const role = await roleRepository.createRole(req.body);
    res.status(201).json(role);
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

userRouter.get('/create', async (req, res) => {
  try {
    console.info('Creating', req.oidc.user, req.oidc.isAuthenticated());
    if (req.oidc.isAuthenticated()) {
      const authUser = req.oidc.user;
      const user = await getUserByAuth0Id(authUser?.sub);
      if (user !== null) {
        return res.redirect('http://localhost:8080/');
      }
      if (authUser) {
        await createUser({
          id: authUser.sub,
          email: authUser.email,
          name: authUser.given_name,
          lastName: authUser.family_name,
        });
        return res.redirect('http://localhost:8080/');
      }
    } else {
      return res.status(401).json({ message: 'User is not authenticated' });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  return res.status(201);
});

export default userRouter;
