import dotenv from 'dotenv';
import Redis from 'ioredis';
dotenv.config();

export const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', () => {
  console.log('🔌 Connected to Redis');
});

redis.on('error', (err) => {
  console.error('❌ Redis error:', err);
});
