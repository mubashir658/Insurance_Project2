import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PolicyEnrollment = ({ policyId, isProminent }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEnrollment = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/enrollments', {
        policyId,
        isProminent
      });

      if (response.data.success) {
        toast.success("Enrollment successful! An agent will contact you soon.");
        navigate('/dashboard');
      } else {
        toast.info(response.data.message);
        navigate('/policies');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={handleEnrollment}
        disabled={loading}
        className={`px-6 py-3 rounded-lg text-white font-semibold ${
          loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Processing...' : 'Continue'}
      </button>
    </div>
  );
};

export default PolicyEnrollment; 