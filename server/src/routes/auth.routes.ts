import { registerUser } from '#controllers/auth.controller.js';
import { validate } from '#middlewares/validate.middleware.js';
import { registerSchema } from '#validations/user.authValidation.js';
import {Router} from 'express';

const router = Router();

router.post('/register', validate(registerSchema), registerUser);


export default router;