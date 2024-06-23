import express from 'express';
import AuthController from './auth.controller.js';
const router = express.Router();
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
export default router;
//dinh nghia cac endpoint va anh xa chung vao cac controllers