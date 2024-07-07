import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { userValidationRules, validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/register', userValidationRules(), validate, register);
router.post('/login', login);
router.post('/login', logout);

export default router;
