// File: src/app.ts
import express from 'express';
import deliveryRoutes from './src/routes/deliveryRoutes';
const app = express();

app.use(express.json());
app.use('/api/delivery', deliveryRoutes);

export default app;