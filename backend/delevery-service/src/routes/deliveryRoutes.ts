// File: src/routes/deliveryRoutes.ts
import express from 'express';
import { createDeliveryRequest, acceptDelivery, updateDeliveryStatus } from '../controllers/deliveryController';

const router = express.Router();

router.post('/request', createDeliveryRequest);
router.post('/accept', acceptDelivery);
router.put('/status/:delivery_id', updateDeliveryStatus);

export default router;