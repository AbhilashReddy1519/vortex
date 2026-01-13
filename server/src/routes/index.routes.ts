import { Router } from 'express';
import gitHubRouter from '#routes/github.routes.js';
import authRouter from '#routes/auth.routes.js';

const router = Router();

router.use('/github', gitHubRouter);
router.use('/auth', authRouter);

export default router;
