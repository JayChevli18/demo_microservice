import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/:id', verifyToken, getProfile);
router.put('/:id', verifyToken, updateProfile);

export default router;