import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

/**
 * SectionHeader — title row with optional "View All" link
 */
export function SectionHeader({ title, viewAllPath, style = {} }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...style }}>
      <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.3px' }}>
        {title}
      </h2>
      {viewAllPath && (
        <button onClick={() => navigate(viewAllPath)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px', fontFamily: 'var(--font-sans)' }}>
          See all <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
