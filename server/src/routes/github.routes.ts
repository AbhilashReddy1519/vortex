import { Router } from 'express';
import { getAccessToken } from '#middlewares/github.middleware.js';
import { authenticateUser } from '#controllers/github.controller.js';

const router = Router();

router.get('/getAccessToken', getAccessToken, authenticateUser);

export default router;
