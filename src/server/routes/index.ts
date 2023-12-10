import { Router } from 'express';
import { usersRouter } from './users';
import { authRouter } from './auth';

export const indexRouter = Router();

indexRouter.use('/users', usersRouter);
indexRouter.use('/auth', authRouter);