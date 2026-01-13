import { loginUser, registerUser } from '#controllers/auth.controller.js';
import { validate } from '#middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from '#validations/user.authValidation.js';
import {Router} from 'express';

const router = Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);


export default router;