import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function verifyToken(token: string): JwtPayload | null {
  try {
    const decodedToken = verify(
      token,
      process.env.JWT_SECRET ?? '',
    ) as JwtPayload;
    return decodedToken;
  } catch (error) {
    if (error instanceof Error) {
      console.info('JWT verification failed:', error.message);
    } else {
      console.info('JWT verification failed:', error);
    }
    return null;
  }
}

export default function checkAuthorization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Missing JWT token' });
    return;
  }

  try {
    const decodedToken = verifyToken(token);
    if (decodedToken && decodedToken.role === 'admin') {
      console.info('Authorized Role: admin');
      next();
    } else {
      console.info('Unauthorized Role: Not admin');
      res.status(401).json({
        error: `Unauthorized Role: ${decodedToken?.role ?? 'no role'}`,
      });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid JWT token' });
  }
}
