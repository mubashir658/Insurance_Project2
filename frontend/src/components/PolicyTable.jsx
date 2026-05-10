import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PolicyTable = ({ policies }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleViewDetails = (policyId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/policy/${policyId}`);
  };

  if (!policies || policies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No policies available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {policies.map((policy) => (
        <div 
          key={policy.policyId} 
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col relative"
        >
          {/* Recommended Badge (conditionally rendered) */}
          {/* You might want to add a logic here to determine if a policy is 'Recommended' */}
          {/* For now, I'll add a placeholder badge that you can control */}
          {/* Remove this div if you don't want any badge */}
          {/*
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
            Recommended
          </div>
          */}

          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{policy.title}</h3>
            
            <div className="text-xl font-semibold text-blue-600 mb-3">
              ₹{policy.premium}
              <span className="text-sm text-gray-500 font-normal">/year</span>
            </div>

            {/* Assuming description is the coverage text */}            
            <p className="text-gray-700 mb-4">Coverage: {policy.description}</p>

            <ul className="space-y-2 text-gray-600 text-sm mb-6 flex-grow">
              {policy.features.map((feature, index) => (
                <li key={index}>
                  <p className="text-sm font-medium text-gray-900">{feature.title}</p>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleViewDetails(policy.policyId)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200 mt-auto"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PolicyTable; 