import { deleteImage } from '../lib/cloudinary.js';
import { streamUpload } from '../lib/multer.js';

import { redis } from '../lib/redis.js';
import { comparePassword, generateToken, hashPassword } from '../lib/utils.js';
import GlobalMessage from '../models/globalMessages.model.js';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Name , Email and Password are must to continue!' });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password must be atleast 8 characters' });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePic: {
        public_id: '',
        secure_url: '',
      },
    });
    await newUser.save();

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    console.log('Error in signup controller ', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: 'All credentials are required to continue!',
      });
    }

    const ip =
      req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const key = `login_attempts:${email}:${ip}`;

    const attempts = await redis.incr(key);

    if (attempts === 1) {
      // Set expiry only on first attempt
      await redis.expire(key, 15 * 60); // 15 minutes
    }
    if (attempts > 5) {
      return res.status(429).json({
        message: 'Too many login attempts. Please try again later.',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPassCorr = await comparePassword(password, user.password);

    if (!isPassCorr) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Success: reset the login attempts for this IP+email
    await redis.del(key);

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({
      message: 'Logged out successfully',
    });
  } catch (err) {
    console.log('Error in logout controller ', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(404).json({ message: 'Profile image is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.profilePic?.public_id) {
      await deleteImage(user.profilePic.public_id);
    }

    const result = await streamUpload(req.file.buffer, {
      resource_type: 'image',
      folder: 'bro-chat/avatars',
    });

    user.profilePic = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    await user.save();

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log('Error in updateProfile controller ', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json({
      _id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      profilePic: req.user.profilePic,
      createdAt: req.user.createdAt,
    });
  } catch (error) {
    console.log('Error in checkAuth controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.profilePic?.public_id) {
      await deleteImage(user.profilePic.public_id);
    }

    const messageWithImages = await Message.find({
      senderId: userId,
      'image.public_id': { $exists: true, $ne: '' },
    });

    for (const msg of messageWithImages) {
      await deleteImage(msg.image.public_id);
    }

    await GlobalMessage.deleteMany({ senderId: userId });

    await Message.deleteMany({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });
    await User.findByIdAndDelete(userId);
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
