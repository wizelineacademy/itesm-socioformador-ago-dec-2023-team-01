/**
 * @openapi
 * components:
 *  schemas:
 *    PostResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 */
export interface PostResponse {
  id: string | number;
}

/**
 * @openapi
 * components:
 *  schemas:
 *    ApiReponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        data:
 *          type: object
 */
export interface ApiReponse {
  message: string;
  data: any;
}
