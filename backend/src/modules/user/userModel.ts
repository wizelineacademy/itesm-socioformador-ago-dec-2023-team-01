/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateRole:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 */
export interface CreateUserInput {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
