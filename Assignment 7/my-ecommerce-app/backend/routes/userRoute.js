import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

/**
 * @route   POST /api/user/register
 * @desc    Handles new user creation
 */
userRouter.post('/register', registerUser);

/**
 * @route   POST /api/user/login
 * @desc    Handles existing user authentication
 */
userRouter.post('/login', loginUser);

/**
 * @route   POST /api/user/admin
 * @desc    Handles admin panel access
 */
userRouter.post('/admin', adminLogin);

export default userRouter;