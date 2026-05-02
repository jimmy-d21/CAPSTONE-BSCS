// Aligned with admin/branchData.js — same 8 branches, same IDs, branchCodes, names
export const storesData = {
  stores: [
    {
      storeId: 1,
      branchCode: "sm_bacolod",
      branchName: "SM Bacolod",
      branchDisplayName: "SM Bacolod",
      location: {
        fullAddress: "SM City Bacolod, Circumferential Road, Bacolod City, Negros Occidental 6100",
        shortAddress: "SM City Bacolod, Bacolod City",
        city: "Bacolod City",
        province: "Negros Occidental",
        region: "Western Visayas",
        zipCode: "6100",
        coordinates: { latitude: 10.6764, longitude: 122.9502 }
      },
      contactInfo: {
        mobileNumber: "+63 934 123 4567",
        email: "smbacolod@ribshack.ph",
        managerEmail: "jose.reyes@ribshack.ph"
      },
      operatingHours: {
        monday:    { open: "10:00", close: "22:00", isOpen: true },
        tuesday:   { open: "10:00", close: "22:00", isOpen: true },
        wednesday: { open: "10:00", close: "22:00", isOpen: true },
        thursday:  { open: "10:00", close: "22:00", isOpen: true },
        friday:    { open: "10:00", close: "23:00", isOpen: true },
        saturday:  { open: "10:00", close: "23:00", isOpen: true },
        sunday:    { open: "10:00", close: "22:00", isOpen: true }
      },
      storeManager: { fullName: "Jose Reyes", mobileNumber: "+63 934 123 4567", email: "jose.reyes@ribshack.ph" },
      status: "active",
      storeType: "mall",
      seatingCapacity: 80,
      hasDelivery: true,
      hasTakeout: true,
      hasDineIn: true,
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },
    {
      storeId: 2,
      branchCode: "ayala_cebu",
      branchName: "Ayala Cebu",
      branchDisplayName: "Ayala Cebu",
      location: {
        fullAddress: "Ayala Center Cebu, Cebu Business Park, Cebu City 6000",
        shortAddress: "Ayala Center Cebu, Cebu City",
        city: "Cebu City",
        province: "Cebu",
        region: "Central Visayas",
        zipCode: "6000",
        coordinates: { latitude: 10.3157, longitude: 123.9057 }
      },
      contactInfo: {
        mobileNumber: "+63 917 234 5678",
        email: "ayalacebu@ribshack.ph",
        managerEmail: "maria.cruz@ribshack.ph"
      },
      operatingHours: {
        monday:    { open: "10:00", close: "22:00", isOpen: true },
        tuesday:   { open: "10:00", close: "22:00", isOpen: true },
        wednesday: { open: "10:00", close: "22:00", isOpen: true },
        thursday:  { open: "10:00", close: "22:00", isOpen: true },
        friday:    { open: "10:00", close: "23:00", isOpen: true },
        saturday:  { open: "10:00", close: "23:00", isOpen: true },
        sunday:    { open: "10:00", close: "22:00", isOpen: true }
      },
      storeManager: { fullName: "Maria Cruz", mobileNumber: "+63 917 234 5678", email: "maria.cruz@ribshack.ph" },
      status: "active",
      storeType: "mall",
      seatingCapacity: 90,
      hasDelivery: true,
      hasTakeout: true,
      hasDineIn: true,
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },
    {
      storeId: 3,
      branchCode: "rob_iloilo",
      branchName: "Robinsons Iloilo",
      branchDisplayName: "Robinsons Iloilo",
      location: {
        fullAddress: "Robinsons Place Iloilo, Ledesma St, Iloilo City 5000",
        shortAddress: "Robinsons Place Iloilo, Iloilo City",
        city: "Iloilo City",
        province: "Iloilo",
        region: "Western Visayas",
        zipCode: "5000",
        coordinates: { latitude: 10.7202, longitude: 122.5621 }
      },
      contactInfo: {
        mobileNumber: "+63 918 345 6789",
        email: "robiloilo@ribshack.ph",
        managerEmail: "carlos.santos@ribshack.ph"
      },
      operatingHours: {
        monday:    { open: "10:00", close: "22:00", isOpen: true },
        tuesday:   { open: "10:00", close: "22:00", isOpen: true },
        wednesday: { open: "10:00", close: "22:00", isOpen: true },
        thursday:  { open: "10:00", close: "22:00", isOpen: true },
        friday:    { open: "10:00", close: "23:00", isOpen: true },
        saturday:  { open: "10:00", close: "23:00", isOpen: true },
        sunday:    { open: "10:00", close: "22:00", isOpen: true }
      },
      storeManager: { fullName: "Carlos Santos", mobileNumber: "+63 918 345 6789", email: "carlos.santos@ribshack.ph" },
      status: "active",
      storeType: "mall",
      seatingCapacity: 70,
      hasDelivery: true,
      hasTakeout: true,
      hasDineIn: true,
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },
    {
      storeId: 4,
      branchCode: "sm_cdo",
      branchName: "SM CDO",
      branchDisplayName: "SM CDO",
      location: {
        fullAddress: "SM City CDO, Mastersons Ave, Cagayan de Oro City 9000",
        shortAddress: "SM City CDO, Cagayan de Oro",
        city: "Cagayan de Oro",
        province: "Misamis Oriental",
        region: "Northern Mindanao",
        zipCode: "9000",
        coordinates: { latitude: 8.4822, longitude: 124.6472 }
      },
      contactInfo: {
        mobileNumber: "+63 919 456 7890",
        email: "smcdo@ribshack.ph",
        managerEmail: "ana.delacruz@ribshack.ph"
      },
      operatingHours: {
        monday:    { open: "10:00", close: "22:00", isOpen: true },
        tuesday:   { open: "10:00", close: "22:00", isOpen: true },
        wednesday: { open: "10:00", close: "22:00", isOpen: true },
        thursday:  { open: "10:00", close: "22:00", isOpen: true },
        friday:    { open: "10:00", close: "23:00", isOpen: true },
        saturday:  { open: "10:00", close: "23:00", isOpen: true },
        sunday:    { open: "10:00", close: "22:00", isOpen: true }
      },
      storeManager: { fullName: "Ana Dela Cruz", mobileNumber: "+63 919 456 7890", email: "ana.delacruz@ribshack.ph" },
      status: "active",
      storeType: "mall",
      seatingCapacity: 75,
      hasDelivery: true,
      hasTakeout: true,
      hasDineIn: true,
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },
    {
      storeId: 5,
      branchCode: "abreeza_davao",
      branchName: "Abreeza Davao",
      branchDisplayName: "Abreeza Davao",
      location: {
        fullAddress: "Abreeza Mall, JP Laurel Ave, Davao City 8000",
        shortAddress: "Abreeza Mall, Davao City",
        city: "Davao City",
        province: "Davao del Sur",
        region: "Davao Region",
        zipCode: "8000",
        coordinates: { latitude: 7.0731, longitude: 125.6128 }
      },
      contactInfo: {
        mobileNumber: "+63 920 567 8901",
        email: "abreezadavao@ribshack.ph",
        managerEmail: "roberto.lim@ribshack.ph"
      },
      operatingHours: {
        monday:    { open: "10:00", close: "22:00", isOpen: true },
        tuesday:   { open: "10:00", close: "22:00", isOpen: true },
        wednesday: { open: "10:00", close: "22:00", isOpen: true },
        thursday:  { open: "10:00", close: "22:00", isOpen: true },
        friday:    { open: "10:00", close: "23:00", isOpen: true },
        saturday:  { open: "10:00", close: "23:00", isOpen: true },
        sunday:    { open: "10:00", close: "22:00", isOpen: true }
      },
      storeManager: { fullName: "Roberto Lim", mobileNumber: "+63 920 567 8901", email: "roberto.lim@ribshack.ph" },
      status: "active",
      storeType: "mall",
      seatingCapacity: 100,
      hasDelivery: true,
      hasTakeout: true,
      hasDineIn: true,
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },
    {
      storeId: 6,
      branchCode: "gaisano_zambo",
      branchName: "Gaisano Zamboanga",
      branchDisplayName: "Gaisano Zamboanga",
      location: {
        fullAddress: "Gaisano Mall, Veterans Ave, Zamboanga City 7000",
        shortAddress: "Gaisano Mall, Zamboanga City",
        city: "Zamboanga City",
        province: "Zamboanga del Sur",
        region: "Zamboanga Peninsula",
        zipCode: "7000",
        coordinates: { latitude: 6.9214, longitude: 122.0790 }
      },
      contactInfo: {
        mobileNumber: "+63 921 678 9012",
        email: "gaisanozambo@ribshack.ph",
        managerEmail: "elena.villanueva@ribshack.ph"
      },
      operatingHours: {
        monday:    { open: "10:00", close: "22:00", isOpen: false },
        tuesday:   { open: "10:00", close: "22:00", isOpen: false },
        wednesday: { open: "10:00", close: "22:00", isOpen: false },
        thursday:  { open: "10:00", close: "22:00", isOpen: false },
        friday:    { open: "10:00", close: "22:00", isOpen: false },
        saturday:  { open: "10:00", close: "22:00", isOpen: false },
        sunday:    { open: "10:00", close: "22:00", isOpen: false }
      },
      storeManager: { fullName: "Elena Villanueva", mobileNumber: "+63 921 678 9012", email: "elena.villanueva@ribshack.ph" },
      status: "temporarily_closed",
      storeType: "mall",
      seatingCapacity: 60,
      hasDelivery: false,
      hasTakeout: false,
      hasDineIn: false,
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },
    {
      storeId: 7,
      branchCode: "sm_manila",
      branchName: "SM Manila",
      branchDisplayName: "SM Manila",
      location: {
        fullAddress: "SM City Manila, Arroceros St, Manila 1000",
        shortAddress: "SM City Manila, Manila",
        city: "Manila",
        province: "Metro Manila",
        region: "NCR",
        zipCode: "1000",
        coordinates: { latitude: 14.5995, longitude: 120.9842 }
      },
      contactInfo: {
        mobileNumber: "+63 922 789 0123",
        email: "smmanila@ribshack.ph",
        managerEmail: "miguel.torres@ribshack.ph"
      },
      operatingHours: {
        monday:    { open: "10:00", close: "22:00", isOpen: true },
        tuesday:   { open: "10:00", close: "22:00", isOpen: true },
        wednesday: { open: "10:00", close: "22:00", isOpen: true },
        thursday:  { open: "10:00", close: "22:00", isOpen: true },
        friday:    { open: "10:00", close: "23:00", isOpen: true },
        saturday:  { open: "10:00", close: "23:00", isOpen: true },
        sunday:    { open: "10:00", close: "22:00", isOpen: true }
      },
      storeManager: { fullName: "Miguel Torres", mobileNumber: "+63 922 789 0123", email: "miguel.torres@ribshack.ph" },
      status: "active",
      storeType: "mall",
      seatingCapacity: 120,
      hasDelivery: true,
      hasTakeout: true,
      hasDineIn: true,
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },
    {
      storeId: 8,
      branchCode: "gateway_cubao",
      branchName: "Gateway Cubao",
      branchDisplayName: "Gateway Cubao",
      location: {
        fullAddress: "Gateway Mall, Gen Romulo Ave, Quezon City 1109",
        shortAddress: "Gateway Mall, Quezon City",
        city: "Quezon City",
        province: "Metro Manila",
        region: "NCR",
        zipCode: "1109",
        coordinates: { latitude: 14.6190, longitude: 121.0567 }
      },
      contactInfo: {
        mobileNumber: "+63 923 890 1234",
        email: "gatewaycubao@ribshack.ph",
        managerEmail: "sandra.aquino@ribshack.ph"
      },
      operatingHours: {
        monday:    { open: "10:00", close: "22:00", isOpen: true },
        tuesday:   { open: "10:00", close: "22:00", isOpen: true },
        wednesday: { open: "10:00", close: "22:00", isOpen: true },
        thursday:  { open: "10:00", close: "22:00", isOpen: true },
        friday:    { open: "10:00", close: "23:00", isOpen: true },
        saturday:  { open: "10:00", close: "23:00", isOpen: true },
        sunday:    { open: "10:00", close: "22:00", isOpen: true }
      },
      storeManager: { fullName: "Sandra Aquino", mobileNumber: "+63 923 890 1234", email: "sandra.aquino@ribshack.ph" },
      status: "active",
      storeType: "mall",
      seatingCapacity: 95,
      hasDelivery: true,
      hasTakeout: true,
      hasDineIn: true,
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },
  ]
};
