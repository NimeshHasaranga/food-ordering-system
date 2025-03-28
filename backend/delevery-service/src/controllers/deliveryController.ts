// File: src/controllers/deliveryController.ts
import { Request, Response } from 'express';
import Delivery from '../models/Delivery';
import { mockGeoNearbyDrivers, mockSendNotification, mockOrderDetails } from '../services/mockServices';

export const createDeliveryRequest = async (req: Request, res: Response) => {
  try {
    const { order_id } = req.body;

    // 1. Get mock order details
    const order = mockOrderDetails(order_id);

    // 2. Find nearby available drivers (mocked geo service)
    const nearbyDrivers = mockGeoNearbyDrivers(order.pickup_location);

    // 3. Send notification to all nearby drivers (mocked notification)
    mockSendNotification(nearbyDrivers, `New delivery available for order ${order_id}`);

    // 4. Create a delivery record with status 'pending'
    const delivery = await Delivery.create({
      order_id,
      pickup_location: order.pickup_location,
      dropoff_location: order.dropoff_location,
    });

    res.status(201).json({ message: 'Delivery request created and drivers notified', delivery });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create delivery request' });
  }
};

export const acceptDelivery = async (req: Request, res: Response) => {
  const { delivery_id, delivery_person_id } = req.body;
  try {
    const delivery = await Delivery.findByIdAndUpdate(
      delivery_id,
      {
        delivery_person_id,
        status: 'assigned',
        updated_at: new Date(),
      },
      { new: true }
    );

    mockSendNotification([delivery_person_id], `You have accepted delivery for order ${delivery?.order_id}`);

    res.status(200).json(delivery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept delivery' });
  }
};

export const updateDeliveryStatus = async (req: Request, res: Response) => {
  const { delivery_id } = req.params;
  const { status, otp, proof } = req.body;

  try {
    const update: any = { status, updated_at: new Date() };
    if (status === 'picked_up') update.otp = otp;
    if (status === 'delivered') update.proof_of_delivery = proof;

    const updatedDelivery = await Delivery.findByIdAndUpdate(delivery_id, update, { new: true });

    res.status(200).json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};