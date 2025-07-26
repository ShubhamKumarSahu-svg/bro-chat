import express from 'express';
import {
  checkAuth,
  deleteAccount,
  login,
  logout,
  signup,
  updateProfile,
} from '../controllers/auth.controller.js';
import { upload } from '../lib/multer.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/check', protectRoute, checkAuth);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.put(
  '/update-profile',
  protectRoute,
  upload.single('profilePic'),
  updateProfile
);
router.delete('/me', protectRoute, deleteAccount);

export default router;
