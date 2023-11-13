import express, { Request, Response } from 'express';
import languageRepository from './languageRepository';
import CustomError from '../../utils/errorModel';

const languageRouter = express.Router();

/**
 * @openapi
 * '/api/languages/':
 *  post:
 *     tags:
 *     - Languages
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateLanguage'
 *     responses:
 *      200:
 *        description: Success
 */
languageRouter.post('/', async (req: Request, res: Response) => {
  try {
    const language = await languageRepository.createLanguage(req.body);
    res.status(200).json(language);
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
 * '/api/languages/':
 *  get:
 *     tags:
 *       - Languages
 *     responses:
 *      200:
 *        description: Success
 */
languageRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const languages = await languageRepository.getLanguages();
    res.status(200).json(languages);
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

export default languageRouter;
