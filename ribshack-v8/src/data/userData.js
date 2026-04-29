// Mock data simulating backend response for user data
export const mockUsers = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    email: "juan.delacruz@email.com",
    mobile: "+63 917 123 4567",
    password: "Password123",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    mobile: "+63 918 234 5678",
    password: "Password123",
    createdAt: "2024-02-20"
  }
];

export const mockAddresses = [
  {
    id: 1,
    userId: 1,
    label: "Home",
    fullAddress: "123 Lacson Street, Barangay 12, Bacolod City, Negros Occidental",
    landmark: "Near Starbucks",
    isDefault: true
  },
  {
    id: 2,
    userId: 1,
    label: "Office",
    fullAddress: "5th Floor, SM Cyberzone, SM City Bacolod, Bacolod City",
    landmark: "SM North Wing",
    isDefault: false
  },
  {
    id: 3,
    userId: 2,
    label: "Home",
    fullAddress: "456 Burgos Street, Barangay 5, Iloilo City, Iloilo",
    landmark: "Near Jaro Cathedral",
    isDefault: true
  }
];

export const mockOrders = [
  {
    id: 402,
    userId: 1,
    branchId: 1,
    items: [
      {
        menuItemId: 1,
        name: "Pork Spareribs",
        quantity: 2,
        price: 195,
        addOns: [
          { id: 'd2', name: 'Mango Shake', price: 75, emoji: '🥭', type: 'drink' },
          { id: 'e1', name: 'Extra Rice', price: 35, emoji: '🍚', type: 'extra' },
        ]
      },
      {
        menuItemId: 5,
        name: "Chicken Inasal - Paa",
        quantity: 1,
        price: 125,
        addOns: [
          { id: 'e3', name: 'Sawsawan Set', price: 25, emoji: '🧂', type: 'extra' },
        ]
      }
    ],
    subtotal: 515,
    deliveryFee: 49,
    total: 564,
    status: "out_for_delivery",
    paymentMethod: "COD",
    deliveryAddress: "123 Lacson Street, Barangay 12, Bacolod City",
    orderDate: "2026-03-28T14:30:00",
    estimatedDelivery: "2026-03-28T15:15:00",
    statusHistory: [
      { status: "order_received", timestamp: "2026-03-28T14:30:00" },
      { status: "grilling", timestamp: "2026-03-28T14:35:00" },
      { status: "ready", timestamp: "2026-03-28T14:50:00" },
      { status: "out_for_delivery", timestamp: "2026-03-28T14:55:00" }
    ]
  },
  {
    id: 401,
    userId: 1,
    branchId: 2,
    items: [
      {
        menuItemId: 12,
        name: "Samgyeopsal Set",
        quantity: 1,
        price: 225,
        addOns: [
          { id: 'd4', name: 'Iced Tea', price: 45, emoji: '🧊', type: 'drink' },
        ]
      },
      {
        menuItemId: 21,
        name: "Mango Shake",
        quantity: 2,
        price: 75,
        addOns: []
      }
    ],
    subtotal: 375,
    deliveryFee: 55,
    total: 430,
    status: "delivered",
    paymentMethod: "GCash",
    deliveryAddress: "123 Lacson Street, Barangay 12, Bacolod City",
    orderDate: "2026-03-27T18:00:00",
    estimatedDelivery: "2026-03-27T18:45:00",
    deliveredAt: "2026-03-27T18:42:00",
    statusHistory: [
      { status: "order_received", timestamp: "2026-03-27T18:00:00" },
      { status: "grilling", timestamp: "2026-03-27T18:05:00" },
      { status: "ready", timestamp: "2026-03-27T18:25:00" },
      { status: "out_for_delivery", timestamp: "2026-03-27T18:30:00" },
      { status: "delivered", timestamp: "2026-03-27T18:42:00" }
    ]
  },
  {
    id: 395,
    userId: 1,
    branchId: 1,
    items: [
      {
        menuItemId: 2,
        name: "BBQ Pork Skewers (3pcs)",
        quantity: 3,
        price: 145,
        addOns: [
          { id: 'e2', name: 'Atchara', price: 20, emoji: '🥗', type: 'extra' },
          { id: 'e4', name: 'Extra Sauce', price: 30, emoji: '🍯', type: 'extra' },
        ]
      },
      {
        menuItemId: 20,
        name: "Calamansi Juice",
        quantity: 3,
        price: 45,
        addOns: []
      }
    ],
    subtotal: 570,
    deliveryFee: 49,
    total: 619,
    status: "delivered",
    paymentMethod: "COD",
    deliveryAddress: "5th Floor, SM Cyberzone, SM City Bacolod",
    orderDate: "2026-03-25T12:15:00",
    estimatedDelivery: "2026-03-25T13:00:00",
    deliveredAt: "2026-03-25T12:58:00",
    statusHistory: [
      { status: "order_received", timestamp: "2026-03-25T12:15:00" },
      { status: "grilling", timestamp: "2026-03-25T12:20:00" },
      { status: "ready", timestamp: "2026-03-25T12:40:00" },
      { status: "out_for_delivery", timestamp: "2026-03-25T12:45:00" },
      { status: "delivered", timestamp: "2026-03-25T12:58:00" }
    ]
  }
];
