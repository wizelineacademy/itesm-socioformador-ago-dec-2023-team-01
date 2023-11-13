/**
 * @openapi
 * components:
 *  schemas:
 *    Conversation:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        userId:
 *          type: string
 *        title:
 *          type: string
 *        languageId:
 *          type: integer
 *        isDeleted:
 *          type: boolean
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        deletedAt:
 *          type: string
 */
export interface Conversation {
  id: number;
  userId: string;
  title: string;
  languageId: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateConversation:
 *      type: object
 *      required:
 *        - userId
 *        - languageId
 *        - title
 *      properties:
 *        userId:
 *          type: string
 *        languageId:
 *          type: integer
 *        title:
 *          type: string
 */
export interface CreateConversationInput {
  userId: string;
  languageId: number;
  title: string;
}
