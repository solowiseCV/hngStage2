import express from 'express';
import { register, login } from '../controllers/authController.js';
import { userValidationRules, validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/register', userValidationRules(), validate, register);
router.post('/login', login);

export default router;
