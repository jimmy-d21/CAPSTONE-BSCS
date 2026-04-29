export const storesData = {
  stores: [
    {
      storeId: 1,
      branchCode: "sm_bacolod",
      branchName: "SM Bacolod",
      branchDisplayName: "SM Bacolod",
      location: {
        fullAddress: "South Wing, South Building, SM City Bacolod, Reclamation Area, Bacolod City, Negros Occidental 6100",
        shortAddress: "SM City Bacolod, Reclamation Area",
        city: "Bacolod",
        province: "Negros Occidental",
        region: "Western Visayas",
        zipCode: "6100",
        coordinates: {
          latitude: 10.6667,
          longitude: 122.9500
        }
      },
      contactInfo: {
        phoneNumber: "+63 34 432 1234",
        mobileNumber: "+63 917 111 2222",
        email: "bacolod@ribshack.ph",
        managerEmail: "juan.manager@ribshack.ph"
      },
      operatingHours: {
        monday: { open: "08:00", close: "22:00", isOpen: true },
        tuesday: { open: "08:00", close: "22:00", isOpen: true },
        wednesday: { open: "08:00", close: "22:00", isOpen: true },
        thursday: { open: "08:00", close: "22:00", isOpen: true },
        friday: { open: "08:00", close: "23:00", isOpen: true },
        saturday: { open: "08:00", close: "23:00", isOpen: true },
        sunday: { open: "08:00", close: "22:00", isOpen: true }
      },
      storeManager: {
        userId: 1,
        fullName: "Juan Manager",
        mobileNumber: "+63 917 111 2222",
        email: "juan.manager@ribshack.ph"
      },
      status: "active", // active, temporarily_closed, permanently_closed
      storeType: "mall", // mall, standalone, food_court
      seatingCapacity: 80,
      hasDelivery: true,
      hasTakeout: true,
      hasDineIn: true,
      features: ["unli_rice", "korean_bbq", "wifi", "airconditioned", "parking"],
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      openedDate: "2020-06-15",
      createdAt: "2020-05-01T10:00:00",
      updatedAt: "2026-03-28T08:00:00"
    },
    {
      storeId: 2,
      branchCode: "ayala_cebu",
      branchName: "Ayala Cebu",
      branchDisplayName: "Ayala Center Cebu",
      location: {
        fullAddress: "3rd Floor, Food Court, Ayala Center Cebu, Cebu Business Park, Cebu City, Cebu 6000",
        shortAddress: "Ayala Center Cebu, Cebu Business Park",
        city: "Cebu City",
        province: "Cebu",
        region: "Central Visayas",
        zipCode: "6000",
        coordinates: {
          latitude: 10.3157,
          longitude: 123.8854
        }
      },
      contactInfo: {
        phoneNumber: "+63 32 234 5678",
        mobileNumber: "+63 918 222 3333",
        email: "cebu@ribshack.ph",
        managerEmail: "maria.manager@ribshack.ph"
      },
      operatingHours: {
        monday: { open: "10:00", close: "21:00", isOpen: true },
        tuesday: { open: "10:00", close: "21:00", isOpen: true },
        wednesday: { open: "10:00", close: "21:00", isOpen: true },
        thursday: { open: "10:00", close: "21:00", isOpen: true },
        friday: { open: "10:00", close: "22:00", isOpen: true },
        saturday: { open: "10:00", close: "22:00", isOpen: true },
        sunday: { open: "10:00", close: "21:00", isOpen: true }
      },
      storeManager: {
        userId: 10,
        fullName: "Maria Manager",
        mobileNumber: "+63 918 222 3333",
        email: "maria.manager@ribshack.ph"
      },
      status: "active",
      storeType: "food_court",
      seatingCapacity: 40,
      hasDelivery: false,
      hasTakeout: true,
      hasDineIn: true,
      features: ["unli_rice", "airconditioned", "fast_service"],
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      openedDate: "2021-03-10",
      createdAt: "2021-02-01T10:00:00",
      updatedAt: "2026-03-28T08:00:00"
    },
    {
      storeId: 3,
      branchCode: "robinson_iloilo",
      branchName: "Robinson's Iloilo",
      branchDisplayName: "Robinson's Place Iloilo",
      location: {
        fullAddress: "2nd Floor, Robinson's Place Iloilo, Gen. Luna Street, Iloilo City, Iloilo 5000",
        shortAddress: "Robinson's Place Iloilo, Gen. Luna Street",
        city: "Iloilo City",
        province: "Iloilo",
        region: "Western Visayas",
        zipCode: "5000",
        coordinates: {
          latitude: 10.6960,
          longitude: 122.5660
        }
      },
      contactInfo: {
        phoneNumber: "+63 33 336 7890",
        mobileNumber: "+63 919 333 4444",
        email: "iloilo@ribshack.ph",
        managerEmail: "pedro.manager@ribshack.ph"
      },
      operatingHours: {
        monday: { open: "10:00", close: "21:00", isOpen: true },
        tuesday: { open: "10:00", close: "21:00", isOpen: true },
        wednesday: { open: "10:00", close: "21:00", isOpen: true },
        thursday: { open: "10:00", close: "21:00", isOpen: true },
        friday: { open: "10:00", close: "21:00", isOpen: true },
        saturday: { open: "10:00", close: "21:00", isOpen: true },
        sunday: { open: "10:00", close: "21:00", isOpen: true }
      },
      storeManager: {
        userId: 15,
        fullName: "Pedro Manager",
        mobileNumber: "+63 919 333 4444",
        email: "pedro.manager@ribshack.ph"
      },
      status: "active",
      storeType: "mall",
      seatingCapacity: 60,
      hasDelivery: true,
      hasTakeout: true,
      hasDineIn: true,
      features: ["unli_rice", "korean_bbq", "wifi", "airconditioned"],
      imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      openedDate: "2021-08-20",
      createdAt: "2021-07-15T10:00:00",
      updatedAt: "2026-03-28T08:00:00"
    },
    {
      storeId: 4,
      branchCode: "bgc_manila",
      branchName: "BGC Manila",
      branchDisplayName: "Bonifacio Global City",
      location: {
        fullAddress: "Ground Floor, High Street South Block, 9th Avenue, Bonifacio Global City, Taguig, Metro Manila 1634",
        shortAddress: "High Street South, BGC, Taguig",
        city: "Taguig",
        province: "Metro Manila",
        region: "NCR",
        zipCode: "1634",
        coordinates: {
          latitude: 14.5547,
          longitude: 121.0505
        }
      },
      contactInfo: {
        phoneNumber: "+63 2 8856 7890",
        mobileNumber: "+63 920 444 5555",
        email: "bgc@ribshack.ph",
        managerEmail: "ana.manager@ribshack.ph"
      },
      operatingHours: {
        monday: { open: "11:00", close: "23:00", isOpen: true },
        tuesday: { open: "11:00", close: "23:00", isOpen: true },
        wednesday: { open: "11:00", close: "23:00", isOpen: true },
        thursday: { open: "11:00", close: "23:00", isOpen: true },
        friday: { open: "11:00", close: "00:00", isOpen: true },
        saturday: { open: "11:00", close: "00:00", isOpen: true },
        sunday: { open: "11:00", close: "23:00", isOpen: true }
      },
      storeManager: {
        userId: 20,
        fullName: "Ana Manager",
        mobileNumber: "+63 920 444 5555",
        email: "ana.manager@ribshack.ph"
      },
      status: "active",
      storeType: "standalone",
      seatingCapacity: 120,
      hasDelivery: true,
      hasTakeout: true,
      hasDineIn: true,
      features: ["unli_rice", "korean_bbq", "wifi", "airconditioned", "parking", "outdoor_seating", "bar"],
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      openedDate: "2022-05-01",
      createdAt: "2022-03-15T10:00:00",
      updatedAt: "2026-03-28T08:00:00"
    },
    {
      storeId: 5,
      branchCode: "sm_davao",
      branchName: "SM Davao",
      branchDisplayName: "SM City Davao",
      location: {
        fullAddress: "2nd Floor, SM City Davao, J.P. Laurel Avenue, Bajada, Davao City, Davao del Sur 8000",
        shortAddress: "SM City Davao, J.P. Laurel Avenue",
        city: "Davao City",
        province: "Davao del Sur",
        region: "Davao Region",
        zipCode: "8000",
        coordinates: {
          latitude: 7.0731,
          longitude: 125.6128
        }
      },
      contactInfo: {
        phoneNumber: "+63 82 227 8901",
        mobileNumber: "+63 921 555 6666",
        email: "davao@ribshack.ph",
        managerEmail: "carlos.manager@ribshack.ph"
      },
      operatingHours: {
        monday: { open: "10:00", close: "21:00", isOpen: true },
        tuesday: { open: "10:00", close: "21:00", isOpen: true },
        wednesday: { open: "10:00", close: "21:00", isOpen: true },
        thursday: { open: "10:00", close: "21:00", isOpen: true },
        friday: { open: "10:00", close: "21:00", isOpen: true },
        saturday: { open: "10:00", close: "21:00", isOpen: true },
        sunday: { open: "10:00", close: "21:00", isOpen: true }
      },
      storeManager: {
        userId: 25,
        fullName: "Carlos Manager",
        mobileNumber: "+63 921 555 6666",
        email: "carlos.manager@ribshack.ph"
      },
      status: "temporarily_closed", // Under renovation
      storeType: "mall",
      seatingCapacity: 70,
      hasDelivery: true,
      hasTakeout: true,
      hasDineIn: true,
      features: ["unli_rice", "korean_bbq", "wifi", "airconditioned", "parking"],
      imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
      openedDate: "2020-11-15",
      createdAt: "2020-10-01T10:00:00",
      updatedAt: "2026-03-28T08:00:00"
    }
  ]
};
