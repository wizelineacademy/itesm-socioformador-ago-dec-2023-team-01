import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

const authRouter = express.Router();

dotenv.config();
/**
 * @openapi
 * '/api/auth/getToken/':
 *  get:
 *     tags:
 *       - Auth
 *     responses:
 *      200:
 *        description: Success
 */
authRouter.get('/getToken', (req: Request, res: Response) => {
  if (req.oidc.isAuthenticated()) {
    res.status(200).json({ token: req.oidc.accessToken });
  } else {
    res.status(302).json({
      message: `Not logged in. Go to: ${process.env.BASE_URL}/login/`,
    });
  }
});

export default authRouter;
