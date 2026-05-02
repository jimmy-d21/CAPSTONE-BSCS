import { useNavigate, useLocation } from 'react-router';
import { Home, UtensilsCrossed, ShoppingBag, ClipboardList, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const NAV_ITEMS = [
  { icon: Home,            label: 'Home',   path: '/home' },
  { icon: UtensilsCrossed, label: 'Menu',   path: '/menu' },
  { icon: ShoppingBag,     label: 'Cart',   path: '/cart' },
  { icon: ClipboardList,   label: 'Orders', path: '/orders' },
  { icon: User,            label: 'Profile',path: '/profile' },
];

export function BottomNav() {
  const navigate         = useNavigate();
  const { pathname }     = useLocation();
  const { getCartCount } = useCart();
  const count            = getCartCount();

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: 'var(--tab-h)', background: '#fff',
      borderTop: '1.5px solid var(--border)',
      display: 'flex', alignItems: 'center',
      zIndex: 100, paddingBottom: 'env(safe-area-inset-bottom)',
      boxShadow: '0 -4px 24px rgba(15,10,0,0.06)',
    }}>
      {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
        const active = pathname === path || (path === '/menu' && pathname.startsWith('/product'));
        const isCart = path === '/cart';
        return (
          <button key={path} onClick={() => navigate(path)} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '3px', padding: '8px 0',
            background: 'none', border: 'none', cursor: 'pointer',
          }}>
            <span style={{ position: 'relative' }}>
              <Icon size={21} style={{ color: active ? 'var(--accent)' : 'var(--text-4)', strokeWidth: active ? 2.5 : 2 }} />
              {isCart && count > 0 && (
                <span style={{
                  position: 'absolute', top: '-5px', right: '-8px',
                  background: 'var(--accent)', color: '#fff',
                  fontSize: '10px', fontWeight: 700,
                  minWidth: '17px', height: '17px', borderRadius: '99px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 4px', border: '2px solid #fff',
                  animation: 'pulse-accent 2s infinite',
                }}>
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </span>
            <span style={{ fontSize: '9px', fontWeight: active ? 700 : 500, color: active ? 'var(--accent)' : 'var(--text-4)' }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
