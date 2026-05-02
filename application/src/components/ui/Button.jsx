/**
 * Button — reusable button with variant support
 * variants: 'primary' | 'secondary' | 'ghost' | 'danger'
 */
export function Button({ children, variant = 'primary', size = 'md', disabled, loading, onClick, type = 'button', style = {}, fullWidth }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: '8px', border: 'none', cursor: disabled || loading ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--font-sans)', fontWeight: 700, borderRadius: 'var(--radius-md)',
    transition: 'all 0.15s', width: fullWidth ? '100%' : undefined,
    opacity: disabled || loading ? 0.6 : 1,
    flexShrink: 0,
  };
  const sizes = {
    sm: { padding: '8px 16px',  fontSize: '13px', height: '36px' },
    md: { padding: '13px 22px', fontSize: '15px', height: '48px' },
    lg: { padding: '15px 28px', fontSize: '16px', height: '54px' },
  };
  const variants = {
    primary:   { background: 'var(--accent)',       color: '#fff',           boxShadow: 'var(--shadow-accent)' },
    secondary: { background: 'var(--bg-muted)',      color: 'var(--text-1)',  border: '1.5px solid var(--border-strong)' },
    ghost:     { background: 'transparent',          color: 'var(--text-2)',  border: '1.5px solid var(--border)' },
    danger:    { background: '#FFF0EF',               color: 'var(--accent)',  border: '1.5px solid #FECDCA' },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}>
      {loading ? <span style={{ width: '16px', height: '16px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> : null}
      {children}
    </button>
  );
}
