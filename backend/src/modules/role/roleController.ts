import express, { Request, Response } from 'express';
import CustomError from '../../utils/errorModel';
import roleRepository from './roleRepository';

const rolesRouter = express.Router();
/**
 * @openapi
 * '/api/roles/':
 *  post:
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
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
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
});

/**
 * @openapi
 * '/api/roles/{roleId}':
 *  get:
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: roleId
 *         in: path
 *         description: Get Role by Id
 *         required: true
 *         schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Success
 */
rolesRouter.get('/:roleId', async (req: Request, res: Response) => {
  try {
    const role = await roleRepository.getRoleById(Number(req.params.roleId));
    res.status(200).json(role);
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
 * '/api/roles/{roleName}':
 *  get:
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: roleName
 *         in: path
 *         description: Get Role by name
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Success
 */
rolesRouter.get('/:roleName', async (req: Request, res: Response) => {
  try {
    const role = await roleRepository.getRoleByName(req.params.roleName);
    res.status(200).json(role);
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
 * '/api/roles/':
 *  get:
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
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
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
});

export default rolesRouter;
