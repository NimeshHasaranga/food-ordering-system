// File: src/models/Delivery.ts
import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
  order_id: String, // From order-service
  delivery_person_id: String, // From user-service
  status: {
    type: String,
    enum: ['pending', 'assigned', 'picked_up', 'on_the_way', 'delivered', 'failed'],
    default: 'pending',
  },
  pickup_location: Object, // Mocked geo-data
  dropoff_location: Object, // Mocked geo-data
  otp: String,
  proof_of_delivery: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Delivery', DeliverySchema);