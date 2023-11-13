import express, { Request, Response } from 'express';
import conversationRepository from './conversationRepository';
import CustomError from '../../utils/errorModel';

const conversationRouter = express.Router();

/**
 * @openapi
 * '/api/conversations/':
 *  post:
 *     tags:
 *     - Conversations
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateConversation'
 *     responses:
 *      200:
 *        description: Success
 */
conversationRouter.post('/', async (req: Request, res: Response) => {
  try {
    const conversation = await conversationRepository.createConversation(
      req.body,
    );
    res.status(200).json(conversation);
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
 * '/api/conversations/{conversationId}':
 *  get:
 *     tags:
 *       - Conversations
 *     parameters:
 *       - name: conversationId
 *         in: path
 *         description: Get conversation by Id
 *         required: true
 *     responses:
 *      200:
 *        description: Success
 */
conversationRouter.get(
  '/:conversationId',
  async (req: Request, res: Response) => {
    try {
      const conversation = await conversationRepository.getConversationById(
        Number(req.params.userId),
      );
      res.status(200).json(conversation);
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

export default conversationRouter;
