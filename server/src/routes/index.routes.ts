import { Router } from 'express';
import gitHubRouter from '#routes/github.routes.js';

const router = Router();

router.use('/github', gitHubRouter);

export default router;
