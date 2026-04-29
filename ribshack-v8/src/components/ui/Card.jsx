/**
 * Card — base surface card
 */
export function Card({ children, style = {}, onClick, noBorder }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: noBorder ? 'none' : '1.5px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
