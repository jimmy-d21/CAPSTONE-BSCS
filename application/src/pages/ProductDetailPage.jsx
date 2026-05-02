import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useCart }   from '../context/CartContext';
import { useMenu }   from '../context/MenuContext';
import { useBranch } from '../context/BranchContext';
import { BottomNav }         from '../components/layout/BottomNav';
import { QuantityStepper }   from '../components/common/QuantityStepper';
import { Badge }             from '../components/ui/Badge';
import { Button }            from '../components/ui/Button';
import { Divider }           from '../components/ui/Divider';
import { getItemImage, FALLBACK_IMG } from '../components/menu/FoodImages';
import { formatPrice }       from '../utils/formatters';
import { ChevronLeft, Star, Flame, Check, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export function ProductDetailPage() {
  const { id }             = useParams();
  const navigate           = useNavigate();
  const { addToCart }      = useCart();
  const { menuData, DRINKS, EXTRAS } = useMenu();
  const { selectedBranch } = useBranch();

  const item = menuData.find(m => m.id === parseInt(id, 10));

  const [qty, setQty]                   = useState(1);
  const [selectedCut, setSelectedCut]   = useState(item?.customOptions?.[0] || '');
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);

  if (!item) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px' }}>
        <span style={{ fontSize: '48px' }}>🔍</span>
        <h2 style={{ fontSize: '20px', fontWeight: 800, textAlign: 'center' }}>Item not found</h2>
        <Button onClick={() => navigate('/menu')}>Back to Menu</Button>
        <BottomNav />
      </div>
    );
  }

  const toggleDrink = (drinkId) =>
    setSelectedDrinks(prev => prev.includes(drinkId) ? prev.filter(d => d !== drinkId) : [...prev, drinkId]);

  const toggleExtra = (extraId) =>
    setSelectedExtras(prev => prev.includes(extraId) ? prev.filter(e => e !== extraId) : [...prev, extraId]);

  /* ── Price calculation ── */
  const drinksTotal = selectedDrinks.reduce((s, id) => s + (DRINKS.find(d => d.id === id)?.price ?? 0), 0);
  const extrasTotal = selectedExtras.reduce((s, id) => s + (EXTRAS.find(e => e.id === id)?.price ?? 0), 0);
  const itemTotal   = (item.price + drinksTotal + extrasTotal) * qty;

  /* ── Add to cart — bundles add-ons into the single cart item ── */
  const handleAddToCart = () => {
    if (!selectedBranch) { toast.error('Please select a branch first'); navigate('/branches'); return; }

    const addOns = [
      ...selectedDrinks.map(id => ({ ...DRINKS.find(d => d.id === id) })),
      ...selectedExtras.map(id => ({ ...EXTRAS.find(e => e.id === id) })),
    ].filter(Boolean);

    const customization = {
      cut:    item.customizable ? selectedCut : undefined,
      addOns: addOns.length ? addOns : undefined,
    };

    addToCart(item, customization);
    if (qty > 1) {
      // addToCart merges duplicates; call it qty-1 more times
      for (let i = 1; i < qty; i++) addToCart(item, customization);
    }

    toast.success(`${item.name} added to cart! 🍖`);
    navigate('/cart');
  };

  const relatedItems = menuData
    .filter(m => m.category === item.category && m.id !== item.id && m.available)
    .slice(0, 4);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      {/* Floating back button */}
      <button
        onClick={() => navigate(-1)}
        style={{ position: 'fixed', top: '16px', left: '16px', zIndex: 100, width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-md)', color: 'var(--text-1)' }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Hero image */}
      <div style={{ position: 'relative', height: '300px', overflow: 'hidden', background: 'var(--bg-muted)' }}>
        <img src={getItemImage(item.image)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.src = FALLBACK_IMG; }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)' }} />
        <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
          {item.bestseller    && <Badge color="gold"><Star size={10} fill="currentColor" /> Bestseller</Badge>}
          {item.includesUnliRice && <Badge color="dark">🍚 Unli Rice</Badge>}
          {!item.available    && <Badge color="red">Sold Out</Badge>}
        </div>
        {item.spicyLevel > 0 && (
          <div style={{ position: 'absolute', bottom: '70px', right: '16px', background: 'var(--accent)', borderRadius: '8px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '2px' }}>
            {Array.from({ length: item.spicyLevel }).map((_, i) => <Flame key={i} size={12} color="#fff" />)}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '0 0 calc(var(--tab-h) + 100px)' }}>
        {/* Name & description */}
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.5px', lineHeight: 1.2, flex: 1 }}>{item.name}</h1>
            <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-1)', flexShrink: 0 }}>{formatPrice(item.price)}</span>
          </div>
          <Badge color="neutral" style={{ marginBottom: '10px' }}>{item.category}</Badge>
          <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.6, fontWeight: 500 }}>{item.description}</p>
        </div>

        <Divider style={{ margin: '20px 0' }} />

        {/* Quantity */}
        <div style={{ padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '2px' }}>Quantity</p>
            <p style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: 500 }}>How many would you like?</p>
          </div>
          <QuantityStepper value={qty} onIncrease={() => setQty(q => q + 1)} onDecrease={() => setQty(q => Math.max(1, q - 1))} />
        </div>

        {/* Cut */}
        {item.customizable && item.customOptions?.length > 0 && (
          <Section title="Choose Your Cut" subtitle="Select your preferred cut" required>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {item.customOptions.map(opt => (
                <OptionRow key={opt} label={opt} selected={selectedCut === opt} onSelect={() => setSelectedCut(opt)} />
              ))}
            </div>
          </Section>
        )}

        {/* Drinks */}
        <Section title="Add a Drink" subtitle="Select one or more drinks to go with your order">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {DRINKS.map(drink => (
              <AddonRow key={drink.id} emoji={drink.emoji} label={drink.name} price={drink.price} selected={selectedDrinks.includes(drink.id)} onToggle={() => toggleDrink(drink.id)} />
            ))}
          </div>
        </Section>

        {/* Extras */}
        <Section title="Add Extras" subtitle="Extras and add-ons to complete your meal">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {EXTRAS.map(extra => (
              <AddonRow key={extra.id} emoji={extra.emoji} label={extra.name} price={extra.price} selected={selectedExtras.includes(extra.id)} onToggle={() => toggleExtra(extra.id)} />
            ))}
          </div>
        </Section>

        {/* Related */}
        {relatedItems.length > 0 && (
          <div style={{ padding: '0 16px' }}>
            <Divider style={{ marginBottom: '20px' }} />
            <p style={{ fontSize: '16px', fontWeight: 800, marginBottom: '12px' }}>More from {item.category}</p>
            <div className="no-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
              {relatedItems.map(rel => (
                <div key={rel.id} onClick={() => navigate(`/product/${rel.id}`)} style={{ flexShrink: 0, width: '140px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1.5px solid var(--border)', cursor: 'pointer' }}>
                  <img src={getItemImage(rel.image)} alt={rel.name} style={{ width: '100%', height: '90px', objectFit: 'cover' }} onError={e => { e.target.src = FALLBACK_IMG; }} />
                  <div style={{ padding: '8px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 600, lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: '4px' }}>{rel.name}</p>
                    <p style={{ fontSize: '13px', fontWeight: 800 }}>{formatPrice(rel.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Add to Cart footer */}
      <div style={{ position: 'fixed', bottom: 'var(--tab-h)', left: 0, right: 0, background: 'var(--bg-card)', borderTop: '1.5px solid var(--border)', padding: '12px 16px', boxShadow: '0 -4px 24px rgba(15,10,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: 500 }}>Total</p>
            <p style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' }}>{formatPrice(itemTotal)}</p>
          </div>
          {(selectedDrinks.length > 0 || selectedExtras.length > 0) && (
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: 500 }}>Base: {formatPrice(item.price * qty)}</p>
              {drinksTotal > 0 && <p style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: 500 }}>Drinks: +{formatPrice(drinksTotal * qty)}</p>}
              {extrasTotal > 0 && <p style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: 500 }}>Extras: +{formatPrice(extrasTotal * qty)}</p>}
            </div>
          )}
        </div>
        <Button fullWidth size="lg" onClick={handleAddToCart} disabled={!item.available} style={{ gap: '10px' }}>
          <ShoppingBag size={18} />
          {item.available ? `Add to Cart · ${formatPrice(itemTotal)}` : 'Currently Unavailable'}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}

/* ── Local sub-components ── */
function Section({ title, subtitle, required, children }) {
  return (
    <div style={{ padding: '0 16px 20px' }}>
      <Divider style={{ marginBottom: '20px' }} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
        <p style={{ fontSize: '16px', fontWeight: 800 }}>{title}</p>
        {required && <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-light)', padding: '2px 7px', borderRadius: '99px' }}>Required</span>}
      </div>
      {subtitle && <p style={{ fontSize: '13px', color: 'var(--text-3)', fontWeight: 500, marginBottom: '14px' }}>{subtitle}</p>}
      {children}
    </div>
  );
}

function OptionRow({ label, selected, onSelect }) {
  return (
    <div onClick={onSelect} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--border)'}`, background: selected ? 'var(--accent-light)' : 'var(--bg-card)' }}>
      <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${selected ? 'var(--accent)' : 'var(--border-strong)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {selected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)' }} />}
      </div>
      <span style={{ fontSize: '14px', fontWeight: 600, flex: 1 }}>{label}</span>
      {selected && <Check size={16} color="var(--accent)" />}
    </div>
  );
}

function AddonRow({ emoji, label, price, selected, onToggle }) {
  return (
    <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--border)'}`, background: selected ? 'var(--accent-light)' : 'var(--bg-card)' }}>
      <span style={{ fontSize: '22px', flexShrink: 0 }}>{emoji}</span>
      <span style={{ fontSize: '14px', fontWeight: 600, flex: 1 }}>{label}</span>
      <span style={{ fontSize: '14px', fontWeight: 700, color: selected ? 'var(--accent)' : 'var(--text-2)', flexShrink: 0 }}>+{formatPrice(price)}</span>
      <div style={{ width: '22px', height: '22px', borderRadius: '6px', border: `2px solid ${selected ? 'var(--accent)' : 'var(--border-strong)'}`, background: selected ? 'var(--accent)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {selected && <Check size={13} color="#fff" strokeWidth={3} />}
      </div>
    </div>
  );
}
