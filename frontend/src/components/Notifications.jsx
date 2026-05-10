import React, { useState } from 'react';

const initial = [
  { id: 1, title: 'Claim CLM-1002 approved', time: '2 days ago', read: false },
  { id: 2, title: 'New policy update available', time: '1 week ago', read: true },
  { id: 3, title: 'Reminder: upload medical documents', time: '3 weeks ago', read: false }
];

const Notifications = () => {
  const [items, setItems] = useState(initial);

  const markRead = (id) => setItems(items.map(i => i.id === id ? { ...i, read: true } : i));
  const markAll = () => setItems(items.map(i => ({ ...i, read: true })));

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Notifications</h2>
        <div>
          <button onClick={markAll} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', color: '#0f172a' }}>Mark all read</button>
        </div>
      </div>
      <p style={{ color: '#6b7280' }}>Important alerts and updates related to your account.</p>

      <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 8, background: item.read ? '#f8fafc' : '#fff', border: '1px solid #e6eef8' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{item.title}</div>
              <div style={{ color: '#6b7280', fontSize: 13 }}>{item.time}</div>
            </div>
            <div>
              {!item.read && <button onClick={() => markRead(item.id)} style={{ padding: '6px 10px', borderRadius: 6, background: '#0369a1', color: '#fff', border: 'none' }}>Mark read</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

