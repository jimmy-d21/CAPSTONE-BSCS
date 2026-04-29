import { createContext, useContext, useState, useEffect } from 'react';
import { inventoryData } from '../data/inventoryData';

const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [restockRequests, setRestockRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from backend
    setInventory(inventoryData.inventory);
    setRestockRequests(inventoryData.restockRequests);
    setIsLoading(false);
  }, []);

  const getLowStockItems = () => {
    return inventory.filter(item => 
      item.status === 'low' || item.status === 'critical'
    );
  };

  const getCriticalStockItems = () => {
    return inventory.filter(item => item.status === 'critical');
  };

  const getAdequateStockItems = () => {
    return inventory.filter(item => item.status === 'adequate');
  };

  const getInventoryStats = () => {
    return {
      adequate: inventory.filter(item => item.status === 'adequate').length,
      low: inventory.filter(item => item.status === 'low').length,
      critical: inventory.filter(item => item.status === 'critical').length,
      total: inventory.length
    };
  };

  const createRestockRequest = (itemId, quantity, urgency) => {
    const item = inventory.find(i => i.itemId === itemId);
    if (!item) return null;

    const newRequest = {
      requestId: `REQ-${Date.now()}`,
      itemId: item.itemId,
      itemName: item.itemName,
      quantityRequested: quantity,
      unit: item.unit,
      urgency: urgency || 'normal',
      status: 'pending',
      requestNote: '',
      requestedAt: new Date().toISOString(),
      requestedBy: 'Juan Manager'
    };

    setRestockRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const getPendingRequests = () => {
    return restockRequests.filter(request => request.status === 'pending');
  };


  const addInventoryItem = (newItem) => {
    const itemId = `ITEM-${Date.now()}`;
    const item = {
      itemId,
      id: itemId,
      itemName: newItem.itemName,
      itemType: newItem.itemType,
      currentStock: newItem.currentStock || 0,
      minimumThreshold: newItem.minimumThreshold,
      maximumThreshold: newItem.maximumThreshold,
      unit: newItem.unit,
      status: 'adequate',
      lastRestockedAt: new Date().toISOString(),
      reorderQuantity: newItem.reorderQuantity || newItem.maximumThreshold - newItem.minimumThreshold
    };

    // Calculate status based on stock levels
    if (item.currentStock <= item.minimumThreshold * 0.5) {
      item.status = 'critical';
    } else if (item.currentStock <= item.minimumThreshold) {
      item.status = 'low';
    } else {
      item.status = 'adequate';
    }

    setInventory(prev => [...prev, item]);
    return item;
  };

  const updateInventoryItem = (itemId, updates) => {
    setInventory(prev => prev.map(item => {
      if (item.itemId === itemId || item.id === itemId) {
        const updatedItem = { ...item, ...updates };

        // Recalculate status if stock or thresholds changed
        if (updates.currentStock !== undefined || updates.minimumThreshold !== undefined) {
          if (updatedItem.currentStock <= updatedItem.minimumThreshold * 0.5) {
            updatedItem.status = 'critical';
          } else if (updatedItem.currentStock <= updatedItem.minimumThreshold) {
            updatedItem.status = 'low';
          } else {
            updatedItem.status = 'adequate';
          }
        }

        return updatedItem;
      }
      return item;
    }));
  };

  const value = {
    inventory,
    restockRequests,
    isLoading,
    getLowStockItems,
    getCriticalStockItems,
    getAdequateStockItems,
    getInventoryStats,
    createRestockRequest,
    getPendingRequests,
    addInventoryItem,
    updateInventoryItem
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};