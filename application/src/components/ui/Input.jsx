/**
 * Input — labelled form input with error state
 */
export function Input({ label, error, type = 'text', placeholder, value, onChange, rightSlot, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-2)' }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          type={type} placeholder={placeholder} value={value} onChange={onChange}
          style={{
            width: '100%', padding: rightSlot ? '13px 48px 13px 16px' : '13px 16px',
            borderRadius: 'var(--radius-md)',
            border: `1.5px solid ${error ? 'var(--accent)' : 'var(--border-strong)'}`,
            background: 'var(--bg-input)', fontFamily: 'var(--font-sans)',
            fontSize: '15px', color: 'var(--text-1)', outline: 'none',
            fontWeight: 500,
            ...style,
          }}
        />
        {rightSlot && (
          <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}>
            {rightSlot}
          </div>
        )}
      </div>
      {error && <p style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>{error}</p>}
    </div>
  );
}
