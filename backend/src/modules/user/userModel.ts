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
 *        email:
 *          type: string
 *        imageUrl:
 *          type: string
 *        role:
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
  imageUrl: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUser:
 *      type: object
 *      required:
 *        - id
 *        - email
 *      properties:
 *        id:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        imageUrl:
 *          type: string
 *        email:
 *          type: string
 *        roleId:
 *          type: integer
 */
export interface CreateUserInput {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  roleId: number;
}
export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
}
/**
 * @openapi
 * components:
 *  schemas:
 *    MakeAdminInput:
 *      type: object
 *      required:
 *        - userId
 *        - isAdmin
 *      properties:
 *        userId:
 *          type: string
 *        isAdmin:
 *          type: boolean
 */
export interface MakeAdminInput {
  userId: string;
  isAdmin: boolean;
}
/**
 * @openapi
 * components:
 *  schemas:
 *    UserTokenOperation:
 *      type: object
 *      required:
 *        - operation
 *        - amount
 *      properties:
 *        operation:
 *          type: string
 *        amount:
 *          type: number
 */
export interface UserTokenOperation {
  operation: 'add' | 'subtract';
  amount: number;
}
