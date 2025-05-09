import { Request, Response, NextFunction } from "express";
export const RequireUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = res.locals.user;
  if (!user) {
    res.status(403);
    return;
  }
  return next();
};
