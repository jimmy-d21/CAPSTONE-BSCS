import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';

/**
 * PageHeader — fixed top bar for inner pages
 */
export function PageHeader({ title, showBack = true, onBack, rightSlot, transparent }) {
  const navigate = useNavigate();
  const handleBack = () => (onBack ? onBack() : navigate(-1));

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 'var(--nav-h)', zIndex: 90,
      background: transparent ? 'transparent' : '#fff',
      borderBottom: transparent ? 'none' : '1.5px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {showBack && (
          <button onClick={handleBack} style={{
            width: '36px', height: '36px', borderRadius: 'var(--radius-md)',
            background: transparent ? 'rgba(255,255,255,0.9)' : 'var(--bg-muted)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-1)', backdropFilter: 'blur(8px)',
          }}>
            <ChevronLeft size={20} />
          </button>
        )}
        {title && (
          <h1 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.2px' }}>
            {title}
          </h1>
        )}
      </div>
      {rightSlot && <div>{rightSlot}</div>}
    </header>
  );
}
