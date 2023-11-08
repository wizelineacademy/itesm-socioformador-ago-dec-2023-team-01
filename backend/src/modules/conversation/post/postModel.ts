/**
 * @openapi
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        content:
 *          type: string
 *        prompt:
 *          type: string
 *        tokenCost:
 *          type: integer
 *        conversationId:
 *          type: integer
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
export interface Post {
  id: number;
  content: string;
  prompt: string;
  tokenCost: number;
  conversationId: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePost:
 *      type: object
 *      required:
 *        - content
 *        - prompt
 *        - tokenCost
 *        - conversationId
 *      properties:
 *        content:
 *          type: string
 *        prompt:
 *          type: string
 *        tokenCost:
 *          type: integer
 *        conversationId:
 *          type: integer
 */
export interface CreatePostInput {
  content: string;
  prompt: string;
  tokenCost: number;
  conversationId: number;
}
