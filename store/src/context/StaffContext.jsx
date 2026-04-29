// context/StaffContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { staffData } from '../data/staffData';

const StaffContext = createContext(null);

export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Normalize staff data to ensure consistent field names
  const normalizeStaffData = (rawStaff) => {
    return rawStaff.map(member => ({
      id: member.id,
      userId: member.userId,
      name: member.name || member.fullName,
      fullName: member.fullName,
      role: member.role,
      email: member.email,
      phoneNumber: member.phoneNumber || member.mobileNumber,
      mobileNumber: member.mobileNumber,
      status: member.status,
      shiftStartTime: member.shiftStartTime || member.shiftToday?.shiftStart || "N/A",
      shiftEndTime: member.shiftEndTime || member.shiftToday?.shiftEnd || "N/A",
      shiftToday: member.shiftToday,
      imageUrl: member.imageUrl,
      checkInTime: member.shiftToday?.checkInTime,
      checkOutTime: member.shiftToday?.checkOutTime
    }));
  };

  // Simulate fetching staff data from backend
  const fetchStaffData = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const normalizedStaff = normalizeStaffData(staffData.staff);
      setStaff(normalizedStaff);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  // Get staff by status
  const getStaffByStatus = (status) => {
    if (!status || status === 'all') {
      return staff;
    }
    return staff.filter(member => member.status === status);
  };

  // Get staff by role
  const getStaffByRole = (role) => {
    if (!role || role === 'all') {
      return staff;
    }
    return staff.filter(member => member.role === role);
  };

  // Get on-duty staff
  const getOnDutyStaff = () => {
    return staff.filter(member => member.status === 'on_duty');
  };

  // Get scheduled staff
  const getScheduledStaff = () => {
    return staff.filter(member => member.status === 'scheduled');
  };

  // Get off-duty staff
  const getOffDutyStaff = () => {
    return staff.filter(member => member.status === 'off_duty');
  };

  // Get staff count by role
  const getStaffCountByRole = (role) => {
    return staff.filter(member => member.role === role).length;
  };

  // Check in staff member
  const checkInStaff = (staffId) => {
    const now = new Date().toISOString();
    setStaff(prevStaff =>
      prevStaff.map(member =>
        member.id === staffId
          ? {
              ...member,
              status: 'on_duty',
              checkInTime: now,
              shiftToday: {
                ...member.shiftToday,
                checkInTime: now,
                shiftStart: member.shiftStartTime,
                shiftEnd: member.shiftEndTime
              }
            }
          : member
      )
    );
  };

  // Check out staff member
  const checkOutStaff = (staffId) => {
    const now = new Date().toISOString();
    setStaff(prevStaff =>
      prevStaff.map(member =>
        member.id === staffId
          ? {
              ...member,
              status: 'off_duty',
              checkOutTime: now,
              shiftToday: {
                ...member.shiftToday,
                checkOutTime: now
              }
            }
          : member
      )
    );
  };

  // Update staff shift
  const updateStaffShift = (staffId, shiftStart, shiftEnd) => {
    setStaff(prevStaff =>
      prevStaff.map(member =>
        member.id === staffId
          ? {
              ...member,
              shiftStartTime: shiftStart,
              shiftEndTime: shiftEnd,
              shiftToday: {
                ...member.shiftToday,
                shiftStart: shiftStart,
                shiftEnd: shiftEnd
              }
            }
          : member
      )
    );
  };

  // Get staff statistics
  const getStaffStats = () => {
    return {
      total: staff.length,
      onDuty: getOnDutyStaff().length,
      scheduled: getScheduledStaff().length,
      offDuty: getOffDutyStaff().length,
      grillers: getStaffCountByRole('griller'),
      cashiers: getStaffCountByRole('cashier'),
      riders: getStaffCountByRole('rider'),
      managers: getStaffCountByRole('manager')
    };
  };

  // Get staff member by id
  const getStaffById = (staffId) => {
    return staff.find(member => member.id === staffId);
  };

  // Refresh staff data
  const refreshStaffData = () => {
    fetchStaffData();
  };

  const value = {
    staff,
    isLoading,
    fetchStaffData,
    getStaffByStatus,
    getStaffByRole,
    getOnDutyStaff,
    getScheduledStaff,
    getOffDutyStaff,
    getStaffCountByRole,
    checkInStaff,
    checkOutStaff,
    updateStaffShift,
    getStaffStats,
    getStaffById,
    refreshStaffData
  };

  return (
    <StaffContext.Provider value={value}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};