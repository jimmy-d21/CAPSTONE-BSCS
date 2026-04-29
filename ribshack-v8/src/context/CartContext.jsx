import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

/* ── helpers ── */
const addOnsTotal = (customization) =>
  (customization?.addOns ?? []).reduce((s, a) => s + a.price, 0);

const itemUnitPrice = (item) => item.price + addOnsTotal(item.customization);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  /* Persist / rehydrate */
  useEffect(() => {
    try {
      const raw = localStorage.getItem('ribshack_cart');
      if (raw) setCartItems(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem('ribshack_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Add an item to the cart.
   * customization shape: { cut?: string, addOns?: AddonObject[] }
   * Add-ons live INSIDE the cart item, NOT as separate line items.
   */
  const addToCart = (item, customization = null) => {
    setCartItems(prev => {
      const key = JSON.stringify(customization);
      const idx = prev.findIndex(
        i => i.id === item.id && JSON.stringify(i.customization) === key
      );

      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        return updated;
      }

      return [
        ...prev,
        {
          ...item,
          quantity:      1,
          customization: customization ?? null,
          cartId:        Date.now() + Math.random(),
        },
      ];
    });
  };

  const removeFromCart = (cartId) =>
    setCartItems(prev => prev.filter(i => i.cartId !== cartId));

  const updateQuantity = (cartId, newQty) => {
    if (newQty <= 0) { removeFromCart(cartId); return; }
    setCartItems(prev =>
      prev.map(i => i.cartId === cartId ? { ...i, quantity: newQty } : i)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('ribshack_cart');
  };

  /* Totals – add-ons factored in per-unit */
  const getCartTotal = () =>
    cartItems.reduce((sum, i) => sum + itemUnitPrice(i) * i.quantity, 0);

  const getCartCount = () =>
    cartItems.reduce((n, i) => n + i.quantity, 0);

  const getDeliveryFee = () => (getCartTotal() >= 500 ? 0 : 49);

  const getGrandTotal = () => getCartTotal() + getDeliveryFee();

  const getItemLineTotal = (cartItem) =>
    itemUnitPrice(cartItem) * cartItem.quantity;

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getDeliveryFee,
    getGrandTotal,
    getItemLineTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
