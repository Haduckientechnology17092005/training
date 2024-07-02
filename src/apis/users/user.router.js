import express from 'express';
import userController from './user.controller.js';
import {verify} from '../../middleware'
const router = express.Router();
router.get('/', userController.getAllUser);
// router.get('/:id', userController.getUserById);
router.get('/:id', verify, userController.getUserById);
router.post('/', userController.createNewUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
export default router;