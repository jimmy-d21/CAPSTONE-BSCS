import { useState, useEffect } from 'react';

const GRADIENTS = [
  'linear-gradient(135deg,#E63329 0%,#FF6B35 100%)',
  'linear-gradient(135deg,#0F0A00 0%,#2E1F00 60%,#8B5E00 100%)',
  'linear-gradient(135deg,#1D4ED8 0%,#2563EB 100%)',
  'linear-gradient(135deg,#065F46 0%,#059669 100%)',
  'linear-gradient(135deg,#7C3AED 0%,#A855F7 100%)',
];

/**
 * PromoCarousel — auto-advancing promo banner carousel
 */
export function PromoCarousel({ promos }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (promos.length < 2) return;
    const t = setInterval(() => setIdx(i => (i + 1) % promos.length), 4500);
    return () => clearInterval(t);
  }, [promos.length]);

  if (!promos.length) return null;

  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', height: '148px', overflow: 'hidden' }}>
        {promos.map((promo, i) => (
          <div key={promo.id} style={{
            position: 'absolute', inset: 0,
            background: GRADIENTS[i % GRADIENTS.length],
            padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            opacity: i === idx ? 1 : 0, transition: 'opacity 0.5s ease',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(-55deg,transparent,transparent 10px,rgba(255,255,255,0.03) 10px,rgba(255,255,255,0.03) 20px)', pointerEvents: 'none' }} />
            {promo.discount && (
              <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', width: 'fit-content', marginBottom: '8px', letterSpacing: '0.5px' }}>
                {promo.discount} OFF
              </span>
            )}
            <h3 style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 800, lineHeight: 1.2, marginBottom: '4px' }}>{promo.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', fontWeight: 500 }}>{promo.description}</p>
          </div>
        ))}
        {/* Dot indicators */}
        <div style={{ position: 'absolute', bottom: '12px', right: '16px', display: 'flex', gap: '5px', zIndex: 2 }}>
          {promos.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? '18px' : '6px', height: '6px', borderRadius: '3px',
              background: 'rgba(255,255,255,0.8)', transition: 'width 0.3s', cursor: 'pointer',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
