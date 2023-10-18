/**
 * @openapi
 * components:
 *  schemas:
 *    Role:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
export interface Role {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
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
export interface CreateRoleInput {
  name: string;
  description?: string;
}
