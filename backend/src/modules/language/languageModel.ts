/**
 * @openapi
 * components:
 *  schemas:
 *    Language:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        name:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
export interface Language {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateLanguage:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 */
export interface CreateLanguageInput {
  name: string;
}
