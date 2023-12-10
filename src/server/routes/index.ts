import { Router } from 'express';
import { usersRouter } from './users';

export const indexRouter = Router();

indexRouter.use('/users', usersRouter);