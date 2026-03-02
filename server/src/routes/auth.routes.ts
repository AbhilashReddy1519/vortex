import {
  checkUsername,
  loginUser,
  registerUser,
  getCurrentUser,
  refreshUser,
} from '#controllers/auth.controller.js';
import { validate } from '#middlewares/validate.middleware.js';
import { verifyUser } from '#middlewares/user/user.middleware.js';
import {
  loginSchema,
  registerSchema,
} from '#validations/user.authValidation.js';
import { Router } from 'express';

const router = Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.get('/username/check', checkUsername);
router.get('/me', verifyUser, getCurrentUser);
router.post('/refresh', refreshUser);

export default router;
