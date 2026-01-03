import { Router } from 'express';
import { getAccessToken } from '#middlewares/github.middleware.js';

const router = Router();

router.get('/getAccessToken', getAccessToken);

export default router;
