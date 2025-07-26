import { streamUpload } from '../lib/multer.js';
import GlobalMessage from '../models/globalMessages.model.js';

export const getGlobalMessages = async (req, res) => {
  try {
    const messages = await GlobalMessage.find()
      .populate('senderId', 'fullName profilePic')
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching global messages:', error);
    res.status(500).json({ message: 'Error fetching global messages' });
  }
};

export const sendGlobalMessages = async (req, res) => {
  try {
    let { text } = req.body;
    text = text?.trim();

    if (!text && !req.file) {
      return res
        .status(400)
        .json({ message: 'Message must have text or image' });
    }

    let image = null;
    if (req.file) {
      const result = await streamUpload(req.file.buffer, {
        resource_type: 'image',
        folder: 'bro-chat/global-messages',
      });
      image = { secure_url: result.secure_url };
    }

    // Create new message
    const newMessage = await GlobalMessage.create({
      senderId: req.user._id,
      text,
      image,
    });

    // Populate senderId so it has _id, fullName, profilePic
    await newMessage.populate('senderId', 'fullName profilePic');

    // Broadcast to socket listeners
    req.app.get('io').to('global').emit('newGlobalMessage', newMessage);

    // Return to client
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending global message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};
