import React, { useState } from 'react';
import './PolicyManagement.css';

const initialPolicies = [
  { id: 1, name: 'Health Secure Plus', type: 'Term', premium: 4500, status: 'Active' },
  { id: 2, name: 'Family Care Plan', type: 'Family', premium: 7800, status: 'Active' },
  { id: 3, name: 'Senior Shield', type: 'Senior', premium: 12000, status: 'Lapsed' },
];

const PolicyManagement = () => {
  const [policies, setPolicies] = useState(initialPolicies);
  const [query, setQuery] = useState('');

  const filtered = policies.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) || String(p.id) === query
  );

  return (
    <div className="policy-management">
      <div className="pm-header">
        <h2>Policy Management</h2>
        <div className="pm-controls">
          <input
            placeholder="Search by name or id"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search policies"
          />
          <button onClick={() => alert('Create policy flow (not implemented)')}>New Policy</button>
        </div>
      </div>

      <div className="pm-list">
        {filtered.length === 0 ? (
          <div className="empty">No policies found</div>
        ) : (
          <table className="pm-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Premium</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.type}</td>
                  <td>₹{p.premium.toLocaleString()}</td>
                  <td>{p.status}</td>
                  <td>
                    <button className="view-btn" onClick={() => alert(`Viewing policy ${p.id}`)}>View</button>
                    <button className="edit-btn" onClick={() => alert(`Editing policy ${p.id}`)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PolicyManagement;
