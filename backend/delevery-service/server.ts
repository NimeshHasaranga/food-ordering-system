import express from 'express';
import connectDB from './src/config/DBconnect'; // Importing the database connection

const app = express();

// Connect to the database
connectDB();

// Your other server setup (e.g., routes, middleware, etc.)
const port = process.env.PORT 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
