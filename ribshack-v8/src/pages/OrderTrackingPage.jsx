import { useParams, useNavigate } from 'react-router';
import { BottomNav } from '../components/layout/BottomNav';
import { Button }    from '../components/ui/Button';
import { Divider }   from '../components/ui/Divider';
import { mockOrders } from '../data/userData';
import { formatPrice } from '../utils/formatters';
import { CheckCircle, Clock, Flame, Bike, Package, MapPin } from 'lucide-react';

const STEPS = [
  { key: 'order_received',   label: 'Order Received', icon: CheckCircle, desc: 'Your order has been confirmed' },
  { key: 'grilling',         label: 'Grilling',        icon: Flame,       desc: 'Our chefs are grilling your order' },
  { key: 'ready',            label: 'Ready',           icon: Package,     desc: 'Your order is packed and ready' },
  { key: 'out_for_delivery', label: 'On the Way',      icon: Bike,        desc: 'Rider is heading your way' },
  { key: 'delivered',        label: 'Delivered!',      icon: CheckCircle, desc: 'Enjoy your meal! Salamat!' },
];
const STEP_KEYS    = STEPS.map(s => s.key);
const STATUS_EMOJI = { order_received: '✅', grilling: '🔥', ready: '📦', out_for_delivery: '🛵', delivered: '🎉' };
const STATUS_LABEL = { order_received: 'Order Received', grilling: 'Grilling Now!', ready: 'Ready for Pickup', out_for_delivery: 'On the Way!', delivered: 'Delivered!' };

export function OrderTrackingPage() {
  const { orderId } = useParams();
  const navigate    = useNavigate();

  let order = mockOrders.find(o => o.id === parseInt(orderId, 10));
  if (!order) {
    try {
      const stored = localStorage.getItem('ribshack_latest_order');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.id === parseInt(orderId, 10)) order = parsed;
      }
    } catch (_) {}
  }

  if (!order) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px' }}>
        <span style={{ fontSize: '48px' }}>🔍</span>
        <h2 style={{ fontSize: '20px', fontWeight: 800, textAlign: 'center' }}>Order not found</h2>
        <p style={{ color: 'var(--text-3)', textAlign: 'center', fontWeight: 500 }}>We couldn't find order #{orderId}</p>
        <Button onClick={() => navigate('/home')}>Back to Home</Button>
        <BottomNav />
      </div>
    );
  }

  const currentIdx = STEP_KEYS.indexOf(order.status);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90, background: 'var(--bg-card)', borderBottom: '1.5px solid var(--border)', height: 'var(--nav-h)', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px' }}>
        <button onClick={() => navigate('/home')} style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--bg-muted)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', color: 'var(--text-1)' }}>‹</button>
        <h1 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-1)' }}>Track Order</h1>
      </header>

      <div style={{ paddingTop: 'var(--nav-h)', paddingBottom: 'calc(var(--tab-h) + 24px)' }}>
        {/* Status hero */}
        <div style={{ background: 'var(--brand-900)', padding: '28px 16px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(240,180,41,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ fontSize: '52px', marginBottom: '10px' }}>{STATUS_EMOJI[order.status] ?? '✅'}</div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '4px', letterSpacing: '-0.3px' }}>
            {STATUS_LABEL[order.status]}
          </h2>
          <p style={{ color: 'var(--brand-300)', fontSize: '13px', fontWeight: 500, marginBottom: '14px' }}>
            Order #{order.id}
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', padding: '6px 14px' }}>
            <Clock size={13} color="var(--brand-300)" />
            <span style={{ color: 'var(--brand-300)', fontSize: '13px', fontWeight: 600 }}>Estimated 30–40 mins</span>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          {/* Progress stepper */}
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '16px 16px 10px', marginBottom: '12px', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '16px' }}>Order Status</p>
            {STEPS.map((step, idx) => {
              const done   = idx <= currentIdx;
              const active = idx === currentIdx;
              const Icon   = step.icon;
              return (
                <div key={step.key} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', position: 'relative', paddingBottom: idx < STEPS.length - 1 ? '20px' : '6px' }}>
                  {idx < STEPS.length - 1 && (
                    <div style={{ position: 'absolute', left: '13px', top: '28px', bottom: 0, width: '2px', background: done && idx < currentIdx ? 'var(--accent)' : 'var(--border)' }} />
                  )}
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0, background: done ? 'var(--accent)' : 'var(--bg-muted)', border: `2px solid ${done ? 'var(--accent)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: active ? 'var(--shadow-accent)' : 'none' }}>
                    <Icon size={13} color={done ? '#fff' : 'var(--text-4)'} />
                  </div>
                  <div style={{ flex: 1, paddingTop: '3px' }}>
                    <p style={{ fontSize: '14px', fontWeight: active ? 700 : 500, color: done ? 'var(--text-1)' : 'var(--text-4)', marginBottom: active ? '2px' : 0 }}>{step.label}</p>
                    {active && <p style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>{step.desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order details */}
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '12px', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '12px' }}>Order Details</p>
            {(order.items ?? []).map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-2)', fontWeight: 500 }}>{item.quantity}× {item.name}</span>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-1)' }}>Total</span>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--accent)' }}>{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Delivery address */}
          {order.deliveryAddress && (
            <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', marginBottom: '16px', border: '1.5px solid var(--border)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ background: 'var(--bg-muted)', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={15} color="var(--accent)" />
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: 600, marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Delivering to</p>
                <p style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.4, color: 'var(--text-1)' }}>{order.deliveryAddress}</p>
              </div>
            </div>
          )}

          <Button fullWidth variant="secondary" onClick={() => navigate('/menu')}>
            Order Again 🍖
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
