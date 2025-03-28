// File: src/services/mockServices.ts
export const mockGeoNearbyDrivers = (pickup_location: any) => {
    return [
      'driver_001',
      'driver_002',
      'driver_003',
    ];
  };
  
  export const mockSendNotification = (recipients: string[], message: string) => {
    console.log(`Mock Notification sent to ${recipients.join(', ')}: ${message}`);
  };
  
  export const mockOrderDetails = (order_id: string) => {
    return {
      order_id,
      pickup_location: { address: 'Pizza Point, Colombo', coordinates: [79.8612, 6.9271] },
      dropoff_location: { address: 'Customer Home, Kandy', coordinates: [80.6375, 7.2906] },
    };
  };
  