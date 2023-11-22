import express, { Request, Response } from 'express';
import CustomError from '../../utils/errorModel';
import tokenService from './tokenService';
import tokenRepository from './tokenRepository';

const tokenRouter = express.Router();

/**
 * @openapi
 * '/api/tokens/':
 *  post:
 *     tags:
 *     - Tokens
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateToken'
 *     responses:
 *      200:
 *        description: Success
 */
tokenRouter.post('/', async (req: Request, res: Response) => {
  try {
    const token = await tokenService.createToken(req.body);
    const newToken = await tokenRepository.createToken(token);
    res.status(200).json(newToken);
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
 * '/api/tokens/':
 *  get:
 *     tags:
 *       - Tokens
 *     responses:
 *      200:
 *        description: Success
 */
tokenRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const tokens = await tokenRepository.getTokens();
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

export default tokenRouter;
