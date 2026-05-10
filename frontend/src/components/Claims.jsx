import React, { useState } from 'react';

const initialClaims = [
  { id: 'CLM-1001', date: '2026-04-01', amount: 12500, status: 'Submitted' },
  { id: 'CLM-1002', date: '2026-03-18', amount: 5400, status: 'Approved' },
  { id: 'CLM-1003', date: '2026-02-05', amount: 32000, status: 'Rejected' }
];

const badgeColor = (status) => {
  switch (status) {
    case 'Approved': return '#16a34a';
    case 'Rejected': return '#dc2626';
    default: return '#f59e0b';
  }
};

const Claims = () => {
  const [claims, setClaims] = useState(initialClaims);

  const handleView = (c) => {
    alert(`Viewing claim ${c.id}\nStatus: ${c.status}\nAmount: ₹${c.amount}`);
  };

  const handleDownload = (c) => {
    alert(`Downloading documents for ${c.id}`);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 8 }}>Claims</h2>
      <p style={{ color: '#6b7280', marginBottom: 16 }}>Manage your insurance claims — view status, download documents, or submit a follow-up.</p>

      <div style={{ display: 'grid', gap: 12 }}>
        {claims.map((c) => (
          <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff' }}>
            <div>
              <div style={{ fontWeight: 700 }}>{c.id}</div>
              <div style={{ color: '#6b7280', fontSize: 13 }}>{c.date} · Amount: ₹{c.amount.toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ padding: '6px 10px', borderRadius: 999, background: badgeColor(c.status), color: '#fff', fontWeight: 600 }}>{c.status}</div>
              <button onClick={() => handleView(c)} style={{ padding: '8px 12px', borderRadius: 6, border: 'none', background: '#0369a1', color: '#fff' }}>View</button>
              <button onClick={() => handleDownload(c)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', color: '#0f172a' }}>Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Claims;
