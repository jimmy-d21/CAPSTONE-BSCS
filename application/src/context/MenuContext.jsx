import { createContext, useContext } from 'react';
import { menuData } from '../data/menuData';

/* ── Shared drinks catalogue ── */
export const DRINKS = [
  { id: 'd1', name: 'Calamansi Juice',  price: 55,  emoji: '🍋', type: 'drink' },
  { id: 'd2', name: 'Mango Shake',      price: 75,  emoji: '🥭', type: 'drink' },
  { id: 'd3', name: 'Buko Juice',       price: 60,  emoji: '🥥', type: 'drink' },
  { id: 'd4', name: 'Iced Tea',         price: 45,  emoji: '🧊', type: 'drink' },
  { id: 'd5', name: 'Soda (Regular)',   price: 40,  emoji: '🥤', type: 'drink' },
  { id: 'd6', name: 'Bottled Water',    price: 25,  emoji: '💧', type: 'drink' },
];

/* ── Shared extras catalogue ── */
export const EXTRAS = [
  { id: 'e1', name: 'Extra Rice',       price: 35,  emoji: '🍚', type: 'extra' },
  { id: 'e2', name: 'Atchara',          price: 20,  emoji: '🥗', type: 'extra' },
  { id: 'e3', name: 'Sawsawan Set',     price: 25,  emoji: '🧂', type: 'extra' },
  { id: 'e4', name: 'Extra Sauce',      price: 30,  emoji: '🍯', type: 'extra' },
  { id: 'e5', name: 'Banana Leaf Wrap', price: 15,  emoji: '🌿', type: 'extra' },
];

const MenuContext = createContext(null);

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within a MenuProvider');
  return ctx;
};

export const MenuProvider = ({ children }) => {
  const getItemById        = (id) => menuData.find(m => m.id === id);
  const getItemsByCategory = (cat) => menuData.filter(m => m.category === cat);
  const getAvailableItems  = () => menuData.filter(m => m.available);
  const getBestsellers     = () => menuData.filter(m => m.bestseller && m.available);

  /* Lookup a drink or extra by composite id (e.g. 'd1', 'e3') */
  const getAddonById = (id) =>
    [...DRINKS, ...EXTRAS].find(a => a.id === id) ?? null;

  const value = {
    menuData,
    DRINKS,
    EXTRAS,
    getItemById,
    getItemsByCategory,
    getAvailableItems,
    getBestsellers,
    getAddonById,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
