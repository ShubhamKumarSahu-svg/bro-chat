import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { streamUpload } from '../lib/multer.js'; // to handle Cloudinary uploads
import GlobalMessage from '../models/globalMessages.model.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on('connection', (socket) => {
  // --- User online tracking ---
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  console.log('User connected: ', socket.id);
  socket.join('global');

  // --- Handle Global Messages ---
  socket.on('sendGlobalMessage', async (data) => {
    try {
      let image = null;

      // If an image buffer is sent, upload it to Cloudinary
      if (data.imageBuffer) {
        const buffer = Buffer.from(data.imageBuffer, 'base64');
        const result = await streamUpload(buffer, {
          resource_type: 'image',
          folder: 'bro-chat/global-messages',
        });

        // Fix: ensure secure_url is present for frontend rendering
        image = {
          secure_url: result.secure_url,
          public_id: result.public_id,
        };
      }

      const newMessage = await GlobalMessage.create({
        senderId: data.senderId,
        text: data.text || '',
        image,
      });

      await newMessage.populate('senderId', 'fullName profilePic');

      io.to('global').emit('newGlobalMessage', newMessage);
    } catch (error) {
      console.error('Error saving global message:', error.message);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // --- Disconnect logic ---
  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);

    if (userId) {
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    }
  });
});

export { app, io, server };
