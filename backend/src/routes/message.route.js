import express from 'express';
import {
  deleteMessage,
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from '../controllers/message.controller.js';
import { upload } from '../lib/mutler.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { isRateLimited } from '../middleware/messageRateLimiter.js';

const router = express.Router();

router.get('/users', protectRoute, getUsersForSidebar);
router.get('/:id', protectRoute, getMessages);

router.post(
  '/send/:id',
  protectRoute,
  isRateLimited,
  upload.single('image'),
  sendMessage
);

router.delete('/delete/:id', protectRoute, deleteMessage);

export default router;
