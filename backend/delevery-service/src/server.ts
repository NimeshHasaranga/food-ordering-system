// File: src/server.ts
import { connectDB } from './utils/db';
import app from '../app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3003;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Delivery service running on port ${PORT}`);
  });
});
