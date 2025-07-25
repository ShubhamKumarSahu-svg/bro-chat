import { redis } from '../lib/redis.js';

const MAX_REQUESTS = 5;
const WINDOW_SECONDS = 10;

export const isRateLimited = async (req, res, next) => {
  const userId = req.user._id.toString();
  const redisKey = `rate_limit:user:${userId}`;

  const current = await redis.incr(redisKey);

  if (current === 1) {
    await redis.expire(redisKey, WINDOW_SECONDS); // Set expiry on first request
  }

  if (current > MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: 'Too many messages... Please wait a moment.',
    });
  }

  next();
};

// const messageLimits = new Map();
// const MAX_REQUESTS = 5;
// const WINDOW_MS = 10000;

// export const isRateLimited = (req, res, next) => {
//   const userId = req.user?._id?.toString();
//   if (!userId)
//     return res.status(400).json({ success: false, message: 'Invalid user' });

//   const now = Date.now();
//   const timestamps = messageLimits.get(userId) || [];

//   // Keep only recent timestamps
//   const recent = timestamps.filter((ts) => now - ts < WINDOW_MS);

//   if (recent.length >= MAX_REQUESTS) {
//     console.warn(`User ${userId} rate-limited at ${new Date().toISOString()}`);
//     return res.status(429).json({
//       success: false,
//       message: 'Too many messages. Please wait a moment.',
//     });
//   }

//   recent.push(now);
//   if (recent.length > MAX_REQUESTS + 1) recent.shift(); // memory cap

//   if (recent.length === 0) {
//     messageLimits.delete(userId);
//   } else {
//     messageLimits.set(userId, recent);
//   }

//   next();
// };
