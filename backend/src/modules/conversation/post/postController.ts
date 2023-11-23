import express, { Request, Response } from 'express';
import CustomError from '../../../utils/errorModel';
import postRepository from './postRepository';
import postService from './postService';

const postRouter = express.Router();

/**
 * @openapi
 * '/api/posts/':
 *  post:
 *     tags:
 *     - Posts
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreatePost'
 *     responses:
 *      200:
 *        description: Success
 */
postRouter.post('/', async (req: Request, res: Response) => {
  try {
    const post = await postService.postToConversation(req.body);
    res.status(200).json(post);
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
 * '/api/posts/{conversationId}':
 *  get:
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: conversationId
 *         in: path
 *         description: Get posts of conversation by Id
 *         required: true
 *     responses:
 *      200:
 *        description: Success
 */
postRouter.get('/:conversationId', async (req: Request, res: Response) => {
  try {
    const posts = await postRepository.getPostsOfConversation(
      Number(req.params.conversationId),
    );
    res.status(200).json(posts);
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

export default postRouter;
