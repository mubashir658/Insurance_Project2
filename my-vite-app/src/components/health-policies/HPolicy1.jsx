import React from 'react';
import PolicyTable from '../PolicyTable';

const HPolicy1 = () => {
  // The policyId should match the ID in your backend database
  const policyId = "HP1"; // You can change this to match your backend policy ID

  return <PolicyTable policyId={policyId} />;
};

export default HPolicy1;