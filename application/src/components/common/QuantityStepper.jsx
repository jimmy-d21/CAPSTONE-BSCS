import { Minus, Plus } from 'lucide-react';

/**
 * QuantityStepper — +/- stepper for cart quantities
 */
export function QuantityStepper({ value, onIncrease, onDecrease, min = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-muted)', borderRadius: '10px', padding: '4px' }}>
      <button
        onClick={onDecrease} disabled={value <= min}
        style={{ width: '28px', height: '28px', borderRadius: '7px', border: 'none', background: value <= min ? 'transparent' : '#fff', cursor: value <= min ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: value <= min ? 'var(--text-4)' : 'var(--text-1)', boxShadow: value <= min ? 'none' : 'var(--shadow-sm)' }}
      >
        <Minus size={13} />
      </button>
      <span style={{ fontSize: '15px', fontWeight: 700, minWidth: '22px', textAlign: 'center', color: 'var(--text-1)' }}>
        {value}
      </span>
      <button
        onClick={onIncrease}
        style={{ width: '28px', height: '28px', borderRadius: '7px', border: 'none', background: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
      >
        <Plus size={13} />
      </button>
    </div>
  );
}
