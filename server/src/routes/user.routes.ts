import {
  completeOnboarding,
  refreshToken,
} from '#controllers/user.controller.js';
import { upload } from '#middlewares/user/images.middleware.js';
import { validate } from '#middlewares/validate.middleware.js';
import { getUseData, verifyUser } from '#middlewares/user/user.middleware.js';
import { onboardSchema } from '#validations/onboard.validation.js';
import { Router } from 'express';

const router = Router();

router.post('/refresh-token', refreshToken);
router.put(
  '/complete-onboarding',
  verifyUser,
  upload.fields([
    { name: 'profile_picture', maxCount: 1 },
    { name: 'cover_picture', maxCount: 1 },
  ]),
  validate(onboardSchema),
  completeOnboarding
);

router.post('/me', verifyUser, getUseData);

export default router;
