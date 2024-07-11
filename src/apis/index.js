import express from 'express';
import { UserRoute } from './users/index.js';
import { authRoute } from './auth/index.js';
import { UploadRouter } from './upload/index.js';

const router = express.Router();

router.use('/users', UserRoute);
router.use('/auth', authRoute);
router.use('/images', UploadRouter);


export default router;