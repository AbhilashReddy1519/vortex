import { completeOnboarding, refreshToken } from '#controllers/user.controller.js';
import { validate } from '#middlewares/validate.middleware.js';
import { onboardSchema } from '#validations/onboard.validation.js';
import { Router } from 'express';

const router = Router();

router.post('/refresh-token', refreshToken);
router.put('/complete-onboarding', validate(onboardSchema), completeOnboarding);

export default router;
