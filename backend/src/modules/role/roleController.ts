import express, { Request, Response } from 'express';
import CustomError from '../../utils/errorModel';
import roleRepository from './roleRepository';

const rolesRouter = express.Router();
/**
 * @openapi
 * '/api/roles/':
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
 *      200:
 *        description: Success
 */
rolesRouter.post('/', async (req: Request, res: Response) => {
  try {
    const role = await roleRepository.createRole(req.body);
    res.status(200).json(role);
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
 * '/api/roles/{roleIdName}':
 *  get:
 *     tags:
 *       - Roles
 *     parameters:
 *       - name: roleIdName
 *         in: path
 *         description: Get Role by Id or Name
 *         required: true
 *     responses:
 *      200:
 *        description: Success
 */
rolesRouter.get('/:roleIdName', async (req: Request, res: Response) => {
  try {
    const role = await roleRepository.getRoleByIdOrName(req.params.roleIdName);
    res.status(200).json(role);
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
 * '/api/roles/':
 *  get:
 *     tags:
 *       - Roles
 *     responses:
 *      200:
 *        description: Success
 */
rolesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const roles = await roleRepository.getRoles();
    res.status(200).json(roles);
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

export default rolesRouter;
