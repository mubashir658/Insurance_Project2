import React, { useState, useRef } from 'react';

const initialDocs = [
  { id: 'DOC-001', name: 'Policy_Document.pdf', uploaded: '2025-09-01' },
  { id: 'DOC-002', name: 'Medical_Report.jpg', uploaded: '2026-02-20' }
];

const Documents = () => {
  const [docs, setDocs] = useState(initialDocs);
  const fileRef = useRef();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newDoc = { id: `DOC-${1000 + docs.length}`, name: file.name, uploaded: new Date().toISOString().slice(0,10) };
    setDocs([newDoc, ...docs]);
    fileRef.current.value = '';
  };

  const handleDownload = (d) => alert(`Downloading ${d.name}`);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 4 }}>Documents</h2>
      <p style={{ color: '#6b7280', marginBottom: 12 }}>Upload and manage your documents related to policies and claims.</p>

      <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <input ref={fileRef} type="file" onChange={handleUpload} />
        <button onClick={() => fileRef.current && fileRef.current.click()} style={{ padding: '8px 12px', borderRadius: 6, background: '#0369a1', color: '#fff', border: 'none' }}>Upload</button>
      </div>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
        {docs.map(d => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottom: '1px solid #f3f4f6' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{d.name}</div>
              <div style={{ color: '#6b7280', fontSize: 13 }}>Uploaded: {d.uploaded}</div>
            </div>
              <div>
              <button onClick={() => handleDownload(d)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', color: '#0f172a' }}>Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
