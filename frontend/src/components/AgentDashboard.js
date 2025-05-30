import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AgentDashboard = ({ agentId }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('available');

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get('/api/enrollments');
      if (response.data.success) {
        setEnrollments(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching enrollments");
    } finally {
      setLoading(false);
    }
  };

  const handleClaimCustomer = async (enrollmentId) => {
    try {
      const response = await axios.put(`/api/enrollments/${enrollmentId}/assign-agent`, {
        agentId
      });

      if (response.data.success) {
        toast.success("Customer claimed successfully!");
        // Update local state
        setEnrollments(prevEnrollments => 
          prevEnrollments.map(enrollment => 
            enrollment.enrollmentId === enrollmentId 
              ? { ...enrollment, agentId } 
              : enrollment
          )
        );
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error claiming customer";
      toast.error(errorMessage);
    }
  };

  const availableCustomers = enrollments.filter(
    enrollment => !enrollment.agentId
  );

  const myCustomers = enrollments.filter(
    enrollment => enrollment.agentId === agentId
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customer Management</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === 'available'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Available Customers
          </button>
          <button
            onClick={() => setActiveTab('my-clients')}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === 'my-clients'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            My Clients
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {activeTab === 'available' ? (
          availableCustomers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No available customers at the moment.</p>
            </div>
          ) : (
            availableCustomers.map((enrollment) => (
              <div
                key={enrollment.enrollmentId}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">Enrollment ID: {enrollment.enrollmentId}</p>
                    <p className="text-gray-600">Policy ID: {enrollment.policyId}</p>
                    <p className="text-gray-600">
                      Enrolled on: {new Date(enrollment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleClaimCustomer(enrollment.enrollmentId)}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Claim Customer
                  </button>
                </div>
              </div>
            ))
          )
        ) : (
          myCustomers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">You haven't claimed any customers yet.</p>
            </div>
          ) : (
            myCustomers.map((enrollment) => (
              <div
                key={enrollment.enrollmentId}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">Enrollment ID: {enrollment.enrollmentId}</p>
                    <p className="text-gray-600">Policy ID: {enrollment.policyId}</p>
                    <p className="text-gray-600">
                      Enrolled on: {new Date(enrollment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    to={`/client-management/${enrollment.enrollmentId}`}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Manage Client
                  </Link>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default AgentDashboard; 