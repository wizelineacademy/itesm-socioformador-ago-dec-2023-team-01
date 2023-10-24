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
 *        area:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
export interface Group {
  id: number;
  name: string;
  area: string;
  createdAt: Date;
  updatedAt: Date | null;
}
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateGroup:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *        area:
 *          type: string
 */
export interface createGroupInput {
  name: string;
  area?: string;
}
