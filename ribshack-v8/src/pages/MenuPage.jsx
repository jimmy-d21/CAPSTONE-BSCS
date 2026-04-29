import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';
import { useBranch } from '../context/BranchContext';
import { BottomNav }    from '../components/layout/BottomNav';
import { MenuCard }     from '../components/menu/MenuCard';
import { menuData }     from '../data/menuData';
import { categoriesData } from '../data/categoriesData';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export function MenuPage() {
  const navigate           = useNavigate();
  const location           = useLocation();
  const { addToCart }      = useCart();
  const { selectedBranch } = useBranch();

  const [search, setSearch]           = useState('');
  const [selectedCat, setSelectedCat] = useState(location.state?.category || 'All');

  const allCats  = ['All', ...categoriesData.map(c => c.name)];
  const filtered = menuData.filter(item => {
    const matchCat    = selectedCat === 'All' || item.category === selectedCat;
    const matchSearch = !search
      || item.name.toLowerCase().includes(search.toLowerCase())
      || item.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAdd = (item) => {
    if (!selectedBranch) { toast.error('Select a branch first'); navigate('/branches'); return; }
    if (item.customizable) { navigate(`/product/${item.id}`); return; }
    addToCart(item);
    toast.success(`${item.name} added!`);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      {/* Sticky header: 144px tall */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
        background: 'var(--bg-card)', borderBottom: '1.5px solid var(--border)',
        height: '144px', padding: '12px 16px 10px',
        display: 'flex', flexDirection: 'column', gap: '10px',
      }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.5px' }}>
          Our Menu
        </h1>

        {/* Search bar */}
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-4)', pointerEvents: 'none' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search dishes…"
            style={{
              width: '100%', padding: '10px 38px',
              background: 'var(--bg-muted)', border: '1.5px solid transparent',
              borderRadius: 'var(--radius-md)', color: 'var(--text-1)',
              fontFamily: 'var(--font-sans)', fontSize: '14px', outline: 'none', fontWeight: 500,
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-4)', padding: 0 }}>
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="no-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {allCats.map(cat => {
            const active  = cat === selectedCat;
            const catData = categoriesData.find(c => c.name === cat);
            return (
              <button key={cat} onClick={() => setSelectedCat(cat)} style={{
                flexShrink: 0, padding: '6px 14px', borderRadius: '99px', border: 'none',
                background: active ? 'var(--brand-900)' : 'var(--bg-muted)',
                color: active ? '#fff' : 'var(--text-2)',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap',
              }}>
                {catData?.icon && `${catData.icon} `}{cat}
              </button>
            );
          })}
        </div>
      </header>

      {/* Content — paddingTop matches header height */}
      <div style={{ padding: '160px 16px calc(var(--tab-h) + 20px)' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</p>
            <p style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-1)', marginBottom: '4px' }}>No items found</p>
            <p style={{ fontSize: '14px', color: 'var(--text-3)', fontWeight: 500 }}>Try a different search or category</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
            {filtered.map(item => (
              <MenuCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
