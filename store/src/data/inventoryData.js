export const inventoryData = {
  branchId: 1,
  lastUpdated: "2026-03-28T10:45:00",
  inventory: [
    {
      id: 1,
      itemName: "Pork Spareribs",
      itemType: "meat",
      currentStock: 15.5,
      unit: "kg",
      minimumThreshold: 10,
      status: "adequate",
      lastRestockedAt: "2026-03-27T08:00:00"
    },
    {
      id: 2,
      itemName: "Chicken Quarters",
      itemType: "meat",
      currentStock: 22.0,
      unit: "kg",
      minimumThreshold: 15,
      status: "adequate",
      lastRestockedAt: "2026-03-27T08:00:00"
    },
    {
      id: 3,
      itemName: "Beef Sirloin",
      itemType: "meat",
      currentStock: 8.5,
      unit: "kg",
      minimumThreshold: 8,
      status: "low",
      lastRestockedAt: "2026-03-26T08:00:00"
    },
    {
      id: 4,
      itemName: "Pork Belly",
      itemType: "meat",
      currentStock: 12.0,
      unit: "kg",
      minimumThreshold: 10,
      status: "adequate",
      lastRestockedAt: "2026-03-27T08:00:00"
    },
    {
      id: 5,
      itemName: "Blue Marlin",
      itemType: "meat",
      currentStock: 2.5,
      unit: "kg",
      minimumThreshold: 5,
      status: "critical",
      lastRestockedAt: "2026-03-25T08:00:00"
    },
    {
      id: 6,
      itemName: "Squid",
      itemType: "meat",
      currentStock: 4.0,
      unit: "kg",
      minimumThreshold: 5,
      status: "low",
      lastRestockedAt: "2026-03-26T08:00:00"
    },
    {
      id: 7,
      itemName: "Rice",
      itemType: "rice",
      currentStock: 3,
      unit: "sacks",
      minimumThreshold: 5,
      status: "critical",
      lastRestockedAt: "2026-03-24T08:00:00"
    },
    {
      id: 8,
      itemName: "BBQ Sticks",
      itemType: "supplies",
      currentStock: 450,
      unit: "pieces",
      minimumThreshold: 200,
      status: "adequate",
      lastRestockedAt: "2026-03-27T08:00:00"
    },
    {
      id: 9,
      itemName: "BBQ Sauce",
      itemType: "supplies",
      currentStock: 8.5,
      unit: "liters",
      minimumThreshold: 10,
      status: "low",
      lastRestockedAt: "2026-03-26T08:00:00"
    },
    {
      id: 10,
      itemName: "Coke",
      itemType: "drinks",
      currentStock: 120,
      unit: "pieces",
      minimumThreshold: 50,
      status: "adequate",
      lastRestockedAt: "2026-03-27T08:00:00"
    },
    {
      id: 11,
      itemName: "Iced Tea Mix",
      itemType: "drinks",
      currentStock: 3.2,
      unit: "liters",
      minimumThreshold: 5,
      status: "low",
      lastRestockedAt: "2026-03-26T08:00:00"
    }
  ],
  restockRequests: [
    {
      id: 1,
      itemName: "Rice",
      quantityRequested: 10,
      unit: "sacks",
      urgency: "critical",
      status: "pending",
      requestNote: "Running out fast due to high demand",
      requestedAt: "2026-03-28T09:30:00",
      requestedBy: "Juan Manager"
    },
    {
      id: 2,
      itemName: "Blue Marlin",
      quantityRequested: 8,
      unit: "kg",
      urgency: "high",
      status: "pending",
      requestNote: "Almost sold out",
      requestedAt: "2026-03-28T10:15:00",
      requestedBy: "Juan Manager"
    },
    {
      id: 3,
      itemName: "BBQ Sauce",
      quantityRequested: 5,
      unit: "liters",
      urgency: "normal",
      status: "approved",
      requestNote: null,
      adminResponse: "Approved. Delivery scheduled for tomorrow.",
      requestedAt: "2026-03-27T14:20:00",
      respondedAt: "2026-03-27T15:30:00",
      requestedBy: "Juan Manager"
    }
  ]
};
