// data/staffData.js

export const staffData = {
  staff: [
    {
      id: 1,
      userId: 1,
      fullName: "Juan Manager",
      name: "Juan Manager", // For consistency
      role: "manager",
      email: "juan.manager@ribshack.ph",
      mobileNumber: "+63 917 111 2222",
      phoneNumber: "+63 917 111 2222", // For consistency
      status: "on_duty",
      shiftToday: {
        shiftStart: "08:00",
        shiftEnd: "17:00",
        checkInTime: "2026-03-28T07:55:00",
        checkOutTime: null
      },
      shiftStartTime: "08:00", // For consistency
      shiftEndTime: "17:00", // For consistency
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    {
      id: 2,
      userId: 2,
      fullName: "Maria Santos",
      name: "Maria Santos",
      role: "griller",
      email: "maria.santos@ribshack.ph",
      mobileNumber: "+63 918 222 3333",
      phoneNumber: "+63 918 222 3333",
      status: "on_duty",
      shiftToday: {
        shiftStart: "08:00",
        shiftEnd: "16:00",
        checkInTime: "2026-03-28T08:10:00",
        checkOutTime: null
      },
      shiftStartTime: "08:00",
      shiftEndTime: "16:00",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    {
      id: 3,
      userId: 3,
      fullName: "Pedro Reyes",
      name: "Pedro Reyes",
      role: "griller",
      email: "pedro.reyes@ribshack.ph",
      mobileNumber: "+63 919 333 4444",
      phoneNumber: "+63 919 333 4444",
      status: "on_duty",
      shiftToday: {
        shiftStart: "08:00",
        shiftEnd: "16:00",
        checkInTime: "2026-03-28T08:05:00",
        checkOutTime: null
      },
      shiftStartTime: "08:00",
      shiftEndTime: "16:00",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      id: 4,
      userId: 4,
      fullName: "Ana Gonzales",
      name: "Ana Gonzales",
      role: "cashier",
      email: "ana.gonzales@ribshack.ph",
      mobileNumber: "+63 920 444 5555",
      phoneNumber: "+63 920 444 5555",
      status: "on_duty",
      shiftToday: {
        shiftStart: "09:00",
        shiftEnd: "18:00",
        checkInTime: "2026-03-28T08:58:00",
        checkOutTime: null
      },
      shiftStartTime: "09:00",
      shiftEndTime: "18:00",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      id: 5,
      userId: 5,
      fullName: "Carlos Tan",
      name: "Carlos Tan",
      role: "rider",
      email: "carlos.tan@ribshack.ph",
      mobileNumber: "+63 921 555 6666",
      phoneNumber: "+63 921 555 6666",
      status: "on_duty",
      shiftToday: {
        shiftStart: "10:00",
        shiftEnd: "19:00",
        checkInTime: "2026-03-28T09:55:00",
        checkOutTime: null
      },
      shiftStartTime: "10:00",
      shiftEndTime: "19:00",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      id: 6,
      userId: 6,
      fullName: "Linda Ramos",
      name: "Linda Ramos",
      role: "cashier",
      email: "linda.ramos@ribshack.ph",
      mobileNumber: "+63 922 666 7777",
      phoneNumber: "+63 922 666 7777",
      status: "scheduled",
      shiftToday: {
        shiftStart: "14:00",
        shiftEnd: "22:00",
        checkInTime: null,
        checkOutTime: null
      },
      shiftStartTime: "14:00",
      shiftEndTime: "22:00",
      imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
    },
    {
      id: 7,
      userId: 7,
      fullName: "Roberto Cruz",
      name: "Roberto Cruz",
      role: "griller",
      email: "roberto.cruz@ribshack.ph",
      mobileNumber: "+63 923 777 8888",
      phoneNumber: "+63 923 777 8888",
      status: "scheduled",
      shiftToday: {
        shiftStart: "14:00",
        shiftEnd: "22:00",
        checkInTime: null,
        checkOutTime: null
      },
      shiftStartTime: "14:00",
      shiftEndTime: "22:00",
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    {
      id: 8,
      userId: 8,
      fullName: "Elena Bautista",
      name: "Elena Bautista",
      role: "rider",
      email: "elena.bautista@ribshack.ph",
      mobileNumber: "+63 924 888 9999",
      phoneNumber: "+63 924 888 9999",
      status: "scheduled",
      shiftToday: {
        shiftStart: "15:00",
        shiftEnd: "23:00",
        checkInTime: null,
        checkOutTime: null
      },
      shiftStartTime: "15:00",
      shiftEndTime: "23:00",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    {
      id: 9,
      userId: 9,
      fullName: "Mario Lopez",
      name: "Mario Lopez",
      role: "rider",
      email: "mario.lopez@ribshack.ph",
      mobileNumber: "+63 925 999 0000",
      phoneNumber: "+63 925 999 0000",
      status: "off_duty",
      shiftToday: {
        shiftStart: "OFF",
        shiftEnd: "OFF",
        checkInTime: null,
        checkOutTime: null
      },
      shiftStartTime: "--:--",
      shiftEndTime: "--:--",
      imageUrl: null
    },
    {
      id: 10,
      userId: 10,
      fullName: "Gina Flores",
      name: "Gina Flores",
      role: "cashier",
      email: "gina.flores@ribshack.ph",
      mobileNumber: "+63 926 111 2223",
      phoneNumber: "+63 926 111 2223",
      status: "off_duty",
      shiftToday: {
        shiftStart: "--:--",
        shiftEnd: "--:--",
        checkInTime: null,
        checkOutTime: null
      },
      shiftStartTime: "--:--",
      shiftEndTime: "--:--",
      imageUrl: null
    }
  ]
};