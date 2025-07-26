import express from 'express';
import {
  getGlobalMessages,
  sendGlobalMessages,
} from '../controllers/globalChat.controller.js';
import { upload } from '../lib/multer.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protectRoute, getGlobalMessages);
router.post('/', protectRoute, upload.single('image'), sendGlobalMessages);

export default router;
