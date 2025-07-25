import mongoose from 'mongoose';
import { streamUpload } from '../lib/mutler.js';
import { redis } from '../lib/redis.js';
import { getReceiverSocketId, io } from '../lib/socket.js';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password');

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error('Error in getUsersForSidebar controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    })
      .sort({ createdAt: 1 })
      .lean();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error in getMessages controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const redisKey = `msg-rate:${senderId}:${receiverId}`;
    const current = await redis.incr(redisKey);
    if (current === 1) {
      await redis.expire(redisKey, 60); // Set expiry on first request
    }

    if (current > 10) {
      return res.status(429).json({
        success: false,
        message: 'Too many messages... Please wait a moment.',
      });
    }

    let imageUrl = null;

    if (!text && !req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'Message must have text or image.' });
    }
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid receiver ID.' });
    }

    if (req.file) {
      const result = await streamUpload(req.file.buffer, {
        resource_type: 'image',
        folder: 'bro-chat/messages',
      });
      imageUrl = result.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // console.log('New message to save:', newMessage);

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error in sendMessage controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message || message.senderId.toString() !== userId.toString()) {
      return res.status(404).json({ error: 'Message not found' });
    }

    message.isDeleted = true;
    message.deletedAt = new Date();
    await message.save();

    res
      .status(200)
      .json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
