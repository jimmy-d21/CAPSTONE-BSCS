/**
 * Badge — status/label chip
 */
export function Badge({ children, color = 'neutral', style = {} }) {
  const colors = {
    neutral: { bg: 'var(--bg-muted)',     text: 'var(--text-2)' },
    red:     { bg: 'var(--accent-light)', text: 'var(--accent)' },
    green:   { bg: 'var(--green-bg)',     text: 'var(--green)' },
    gold:    { bg: 'var(--brand-100)',    text: 'var(--brand-600)' },
    dark:    { bg: 'var(--brand-800)',    text: '#fff' },
  };
  const c = colors[color] || colors.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '3px 9px', borderRadius: '99px',
      fontSize: '11px', fontWeight: 700, lineHeight: 1.4,
      background: c.bg, color: c.text,
      fontFamily: 'var(--font-sans)',
      ...style,
    }}>
      {children}
    </span>
  );
}
