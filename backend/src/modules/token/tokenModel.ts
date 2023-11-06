/**
 * @openapi
 * components:
 *  schemas:
 *    Token:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        userId:
 *          type: string
 *        amount:
 *          type: integer
 *        currentAmount:
 *          type: integer
 *        expiresAt:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
export interface TokenDto {
  id: number;
  userId: string;
  amount: number;
  currentAmount: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateToken:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        amount:
 *          type: integer
 *        expiresAt:
 *          type: string
 */
export interface CreateTokenInput {
  userId: string;
  amount: number;
  expiresAt: Date;
}

export interface CreateTokenDto {
  userId: string;
  amount: number;
  currentAmount: number;
  expiresAt: Date;
}
