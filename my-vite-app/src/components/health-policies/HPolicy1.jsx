import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PolicyTemplate from '../PolicyTemplate';

const HPolicy1 = () => {
  const policyId = "HP1"; // The policyId for this specific page
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/policies/${policyId}`);
        setPolicyData(response.data);
      } catch (err) {
        console.error(`Error fetching policy ${policyId}:`, err);
        setError('Failed to fetch policy details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [policyId]); // Re-run effect if policyId changes (though it's hardcoded here)

  if (loading) {
    return <div>Loading policy details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!policyData) {
    return <div>Policy not found.</div>;
  }

  // Pass the fetched policy data to PolicyTemplate
  return <PolicyTemplate policyData={policyData} />;
};

export default HPolicy1;