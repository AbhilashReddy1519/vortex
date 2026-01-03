import { authenticateUser } from '#controllers/github.controller.js';
import { getAccessToken } from '#middlewares/github.middleware.js';
import { Router } from 'express';

const router = Router();

router.get('/getAccessToken', getAccessToken, authenticateUser);

export default router;
