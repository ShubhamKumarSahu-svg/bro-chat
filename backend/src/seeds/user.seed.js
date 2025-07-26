import { config } from 'dotenv';
import { connectDB } from '../lib/db.js';
import { hashPassword } from '../lib/utils.js';
import User from '../models/user.model.js';

config({ path: './backend/.env' });

const seedUsers = [
  // Female Users
  {
    email: 'suman.sharma@example.com',
    fullName: 'Suman Sharma',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
  },
  {
    email: 'rekha.verma@example.com',
    fullName: 'Rekha Verma',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    email: 'meena.patel@example.com',
    fullName: 'Meena Patel',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
  },
  {
    email: 'geeta.iyer@example.com',
    fullName: 'Geeta Iyer',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/women/41.jpg',
  },
  {
    email: 'anita.kumar@example.com',
    fullName: 'Anita Kumar',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/women/51.jpg',
  },
  {
    email: 'pooja.nair@example.com',
    fullName: 'Pooja Nair',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/women/61.jpg',
  },
  {
    email: 'divya.menon@example.com',
    fullName: 'Divya Menon',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/women/71.jpg',
  },
  {
    email: 'neha.chatterjee@example.com',
    fullName: 'Neha Chatterjee',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/women/81.jpg',
  },

  // Male Users
  {
    email: 'rajesh.kumar@example.com',
    fullName: 'Rajesh Kumar',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    email: 'amit.shah@example.com',
    fullName: 'Amit Shah',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/men/21.jpg',
  },
  {
    email: 'vijay.malhotra@example.com',
    fullName: 'Vijay Malhotra',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
  },
  {
    email: 'arun.joshi@example.com',
    fullName: 'Arun Joshi',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    email: 'sachin.rao@example.com',
    fullName: 'Sachin Rao',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/men/51.jpg',
  },
  {
    email: 'manoj.tiwari@example.com',
    fullName: 'Manoj Tiwari',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/men/61.jpg',
  },
  {
    email: 'rahul.mehta@example.com',
    fullName: 'Rahul Mehta',
    password: '123456',
    avatarUrl: 'https://randomuser.me/api/portraits/men/71.jpg',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany();

    // Hash passwords and adjust profilePic field
    const usersWithHashedPasswords = await Promise.all(
      seedUsers.map(async (user) => ({
        email: user.email,
        fullName: user.fullName,
        password: await hashPassword(user.password),
        profilePic: {
          public_id: '', // no Cloudinary upload
          secure_url: user.avatarUrl || '/avatar.png',
        },
      }))
    );

    await User.insertMany(usersWithHashedPasswords);
    console.log('✅ Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
