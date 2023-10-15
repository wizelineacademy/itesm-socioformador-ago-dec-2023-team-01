import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import CustomError from '../utils/errorModel';

export default function errorMiddleware(
  error: CustomError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction,
) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Unique field already exists.' });
    } else {
      res.status(400).json({ error: error.message });
    }
  } else {
    const statusCode = error.status || 500;
    const errorMessage = error.message;
    res.status(statusCode).json({ error: errorMessage });
  }
}
