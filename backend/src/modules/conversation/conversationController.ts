import express, { Request, Response } from 'express';
import conversationRepository from './conversationRepository';
import CustomError from '../../utils/errorModel';
import conversationService from './conversationService';

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
 * '/api/conversations/{conversationId}/full-chat':
 *  get:
 *     tags:
 *       - Conversations
 *     parameters:
 *       - name: conversationId
 *         in: path
 *         description: Get conversation fullchat by id
 *         required: true
 *     responses:
 *      200:
 *        description: Success
 */
conversationRouter.get(
  '/:conversationId/full-chat',
  async (req: Request, res: Response) => {
    try {
      const fullchat = await conversationService.getConversationFullChat(
        Number(req.params.conversationId),
      );
      res.status(200).json(fullchat);
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
conversationRouter.get('/:conversationId', async (req, res) => {
  try {
    const conversation = await conversationRepository.getConversationById(
      Number(req.params.conversationId),
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
 * '/api/conversations/':
 *  get:
 *     tags:
 *       - Conversations
 *     responses:
 *      200:
 *        description: Success
 */
conversationRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const conversations = await conversationRepository.getConversations();
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
});

/**
 * @openapi
 * '/api/conversations/{conversationId}':
 *  delete:
 *     tags:
 *       - Conversations
 *     parameters:
 *       - name: conversationId
 *         in: path
 *         required: true
 *         description: ID of the conversation to delete
 *     responses:
 *       201:
 *         description: conversation deleted successfully
 *       404:
 *         description: conversation not found
 *       500:
 *         description: Internal server error
 */
conversationRouter.delete('/:conversationId', async (req, res) => {
  try {
    await conversationRepository.deleteConversation(
      Number(req.params.conversationId),
    );
    res.status(201).json({ message: 'Conversation deleted successfully' });
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
 * '/api/conversations/{conversationId}/title':
 *   patch:
 *     tags:
 *       - Conversations
 *     parameters:
 *       - name: conversationId
 *         in: path
 *         required: true
 *         description: The ID of the conversationId to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: new title
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: new title
 *     responses:
 *       201:
 *         description: title edited successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       404:
 *         description: Conversation not found
 *       500:
 *         description: Internal server error
 */
conversationRouter.patch(
  '/:conversationId/title',
  async (req: Request, res) => {
    try {
      const updated = await conversationRepository.updateConversation(
        Number(req.params.conversationId),
        { title: req.body.title },
      );
      res.status(201).json(updated);
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
