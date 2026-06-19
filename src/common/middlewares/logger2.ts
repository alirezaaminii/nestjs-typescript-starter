import { NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('logger function middleware', res, res);
  next();
}
