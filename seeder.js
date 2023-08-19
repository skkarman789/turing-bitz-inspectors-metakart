import dotenv from 'dotenv';
import userData from './data/userData.js';
import userShare from './models/userShare.js';
import connectDB from './config/db.js';

// require('dotenv').config();
dotenv.config();
connectDB();

const importData = async () => {
  try {
    await userShare.deleteMany();

    const createdUserShares = await userShare.insertMany(userData);
    console.log(`Data Imported!`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const destroyData = async () => {
  try {
    await userShare.deleteMany();
    console.log(`Data Destroyed!`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
