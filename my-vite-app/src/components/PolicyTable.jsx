import React, { useState, useEffect } from 'react';
import './PolicyTable.css';

const PolicyTable = ({ policyId }) => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await fetch(`/api/policies/${policyId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch policy data');
        }
        const data = await response.json();
        setPolicy(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [policyId]);

  if (loading) return <div className="loading">Loading policy details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!policy) return <div className="error">No policy found</div>;

  return (
    <div className="policy-table-container">
      <h2>{policy.title}</h2>
      <table className="policy-table">
        <tbody>
          <tr>
            <th>Policy ID</th>
            <td>{policy.policyId}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{policy.description}</td>
          </tr>
          <tr>
            <th>Type</th>
            <td>{policy.type}</td>
          </tr>
          <tr>
            <th>Premium</th>
            <td>₹{policy.premium}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{new Date(policy.createdAt).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PolicyTable; 