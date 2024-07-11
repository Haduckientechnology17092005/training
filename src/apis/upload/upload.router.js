import express from 'express';
import uploadService from './upload.service.js';
import uploadImage from './upload.controller.js';
const router = express.Router();
router.post('/image', uploadImage);
export default router;