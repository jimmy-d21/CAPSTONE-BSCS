export const ordersData = {
  orders: [
    {
      id: 1,
      orderNumber: "ORD-402",
      customerName: "Juan Dela Cruz",
      customerPhone: "+63 917 123 4567",
      orderType: "delivery",
      status: "pending",
      items: [
        {
          productName: "Pork Spareribs",
          quantity: 2,
          customization: "Extra spicy",
          includesUnliRice: true
        },
        {
          productName: "Chicken Inasal (Pecho)",
          quantity: 1,
          customization: "Pecho",
          includesUnliRice: true
        }
      ],
      totalAmount: 890.00,
      specialInstructions: "No sauce on the side",
      orderReceivedAt: "2026-03-28T10:50:00",
      estimatedTime: 25
    },
    {
      id: 2,
      orderNumber: "ORD-403",
      customerName: "Maria Santos",
      customerPhone: "+63 918 234 5678",
      orderType: "dine-in",
      status: "on_grill",
      items: [
        {
          productName: "BBQ Skewers (Pork)",
          quantity: 5,
          customization: null,
          includesUnliRice: true
        },
        {
          productName: "Iced Tea",
          quantity: 2,
          customization: "Less sugar",
          includesUnliRice: false
        }
      ],
      totalAmount: 425.00,
      specialInstructions: null,
      orderReceivedAt: "2026-03-28T10:35:00",
      estimatedTime: 15
    },
    {
      id: 3,
      orderNumber: "ORD-404",
      customerName: "Pedro Reyes",
      customerPhone: "+63 919 345 6789",
      orderType: "delivery",
      status: "ready",
      items: [
        {
          productName: "Korean BBQ Samgyupsal",
          quantity: 3,
          customization: null,
          includesUnliRice: true
        },
        {
          productName: "Beef Bulgogi",
          quantity: 1,
          customization: null,
          includesUnliRice: true
        }
      ],
      totalAmount: 1580.00,
      specialInstructions: "Extra lettuce wraps please",
      orderReceivedAt: "2026-03-28T10:20:00",
      estimatedTime: 5
    },
    {
      id: 4,
      orderNumber: "ORD-405",
      customerName: "Ana Gonzales",
      customerPhone: "+63 920 456 7890",
      orderType: "dine-in",
      status: "pending",
      items: [
        {
          productName: "Chicken Inasal (Paa)",
          quantity: 2,
          customization: "Paa",
          includesUnliRice: true
        }
      ],
      totalAmount: 340.00,
      specialInstructions: "Well done",
      orderReceivedAt: "2026-03-28T10:52:00",
      estimatedTime: 20
    },
    {
      id: 5,
      orderNumber: "ORD-406",
      customerName: "Carlos Tan",
      customerPhone: "+63 921 567 8901",
      orderType: "delivery",
      status: "dispatched",
      items: [
        {
          productName: "Grilled Blue Marlin",
          quantity: 1,
          customization: null,
          includesUnliRice: true
        },
        {
          productName: "Squid BBQ",
          quantity: 2,
          customization: null,
          includesUnliRice: true
        },
        {
          productName: "Coke",
          quantity: 3,
          customization: null,
          includesUnliRice: false
        }
      ],
      totalAmount: 1150.00,
      specialInstructions: null,
      orderReceivedAt: "2026-03-28T10:05:00",
      estimatedTime: 0
    },
    {
      id: 6,
      orderNumber: "ORD-407",
      customerName: "Linda Ramos",
      customerPhone: "+63 922 678 9012",
      orderType: "dine-in",
      status: "on_grill",
      items: [
        {
          productName: "Pork Belly BBQ",
          quantity: 2,
          customization: null,
          includesUnliRice: true
        }
      ],
      totalAmount: 480.00,
      specialInstructions: null,
      orderReceivedAt: "2026-03-28T10:40:00",
      estimatedTime: 12
    }
  ]
};
