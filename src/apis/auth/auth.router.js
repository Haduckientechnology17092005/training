import express from 'express';
import AuthController from './auth.controller.js';
import { verify } from '../../middleware/'
const router = express.Router();
router.post('/login', AuthController.login);
router.get('/me', verify,(req, res) => {
    res.json({ message: 'Protected route', user: req.user });
});
router.post('/register', AuthController.register);
// router.post('/forgot-password', AuthController.forgotPassword);
// router.post('/reset-password', AuthController.resetPassword);
export default router;
