import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useBranch } from '../context/BranchContext';
import { useCart } from '../context/CartContext';
import { BottomNav }       from '../components/layout/BottomNav';
import { PromoCarousel }   from '../components/common/PromoCarousel';
import { SectionHeader }   from '../components/common/SectionHeader';
import { MenuCard }        from '../components/menu/MenuCard';
import { Badge }           from '../components/ui/Badge';
import { menuData }        from '../data/menuData';
import { categoriesData }  from '../data/categoriesData';
import { promosData }      from '../data/promosData';
import { branchesData }    from '../data/branchesData';
import { formatPrice }     from '../utils/formatters';
import { MapPin, Clock, ChevronRight, Search } from 'lucide-react';
import { toast } from 'sonner';

export function HomePage() {
  const navigate           = useNavigate();
  const { user }           = useAuth();
  const { selectedBranch } = useBranch();
  const { addToCart }      = useCart();

  const activePromos  = promosData.filter(p => p.active);
  const bestsellers   = menuData.filter(i => i.bestseller && i.available).slice(0, 8);
  const openBranches  = branchesData.filter(b => b.status === 'open').slice(0, 3);
  const firstName     = user?.name?.split(' ')[0] || 'there';

  const handleAdd = (item) => {
    if (!selectedBranch) { toast.error('Please select a branch first'); navigate('/branches'); return; }
    if (item.customizable) { navigate(`/product/${item.id}`); return; }
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      {/* Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
        background: 'var(--bg-card)', borderBottom: '1.5px solid var(--border)',
        height: 'var(--nav-h)', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 16px',
      }}>
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: 500 }}>Good day,</p>
          <p style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.3px' }}>
            {firstName} 👋
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => navigate('/menu')} style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', background: 'var(--bg-muted)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)' }}>
            <Search size={18} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="https://imgs.search.brave.com/hWbozxaUVaBFXWHC_C_uy8BIvSKkKx6Sc_QSI2SuXVs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kM3Vw/NDh3c3M2bHZqLmNs/b3VkZnJvbnQubmV0/L2RhdGEvdXBsb2Fk/cy8yMDIxLzAyL1Jp/YnNoYWNrX1NNQkQu/anBn" alt="Ribshack" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML='<span style="font-size:18px">🍖</span>'; }} />
            </div>
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '16px', color: '#fff' }}>Ribshack</span>
          </div>
        </div>
      </header>

      <div style={{ paddingTop: 'var(--nav-h)', paddingBottom: 'calc(var(--tab-h) + 16px)' }}>

        {/* Branch banner */}
        <div style={{ padding: '14px 16px 0' }}>
          {selectedBranch ? (
            <div style={{ background: 'var(--brand-900)', borderRadius: 'var(--radius-lg)', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'var(--accent)', borderRadius: '10px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={16} color="#fff" />
                </div>
                <div>
                  <p style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>{selectedBranch.name}</p>
                  <p style={{ color: 'var(--brand-300)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={10} /> {selectedBranch.estimatedDelivery}
                  </p>
                </div>
              </div>
              <button onClick={() => navigate('/branches')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '6px 10px', color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                Change
              </button>
            </div>
          ) : (
            <div onClick={() => navigate('/branches')} style={{ background: 'var(--accent-light)', border: '1.5px dashed var(--accent)', borderRadius: 'var(--radius-lg)', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} color="var(--accent)" />
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)' }}>Choose a branch to start ordering</p>
              </div>
              <ChevronRight size={16} color="var(--accent)" />
            </div>
          )}
        </div>

        {/* Promo carousel */}
        <div style={{ marginTop: '16px' }}>
          <PromoCarousel promos={activePromos} />
        </div>

        {/* Categories */}
        <div style={{ padding: '20px 16px 0' }}>
          <SectionHeader title="Categories" viewAllPath="/menu" style={{ marginBottom: '12px' }} />
          <div className="no-scrollbar" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categoriesData.map(cat => (
              <button key={cat.id} onClick={() => navigate('/menu', { state: { category: cat.name } })} style={{
                flexShrink: 0, background: 'var(--bg-card)', border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '12px 16px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                cursor: 'pointer', minWidth: '72px', boxShadow: 'var(--shadow-sm)',
              }}>
                <span style={{ fontSize: '26px' }}>{cat.icon}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap', color: 'var(--text-2)' }}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bestsellers */}
        <div style={{ padding: '20px 16px 0' }}>
          <SectionHeader title="Bestsellers ⭐" viewAllPath="/menu" style={{ marginBottom: '12px' }} />
          <div className="no-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
            {bestsellers.map(item => (
              <div key={item.id} style={{ flexShrink: 0, width: '158px' }}>
                <MenuCard item={item} onAdd={handleAdd} />
              </div>
            ))}
          </div>
        </div>

        {/* Branches */}
        <div style={{ padding: '20px 16px 0' }}>
          <SectionHeader title="Our Branches" viewAllPath="/branches" style={{ marginBottom: '12px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {openBranches.map(branch => (
              <div key={branch.id} onClick={() => navigate('/branches')} style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '14px', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', background: 'var(--bg-muted)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={17} color="var(--accent)" />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 700, marginBottom: '2px', color: 'var(--text-1)' }}>{branch.name}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: 500 }}>{branch.city} · {branch.estimatedDelivery}</p>
                  </div>
                </div>
                <Badge color="green">Open</Badge>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '8px' }} />
      </div>

      <BottomNav />
    </div>
  );
}
