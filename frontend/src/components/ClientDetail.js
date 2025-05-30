import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClientDetail = ({ agentId }) => {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchClientDetails();
  }, [enrollmentId]);

  const fetchClientDetails = async () => {
    try {
      const response = await axios.get(`/api/enrollments/${enrollmentId}`);
      if (response.data.success) {
        setClient(response.data.data);
        setNotes(response.data.data.notes || '');
      }
    } catch (error) {
      toast.error("Error fetching client details");
      navigate('/agent-dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNotes = async () => {
    try {
      const response = await axios.put(`/api/enrollments/${enrollmentId}/notes`, {
        notes,
        agentId
      });

      if (response.data.success) {
        toast.success("Notes updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("Error updating notes");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Client not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Client Details</h2>
          <button
            onClick={() => navigate('/agent-dashboard')}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to Dashboard
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="font-semibold text-gray-700">Enrollment ID</p>
            <p className="text-gray-600">{client.enrollmentId}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Policy ID</p>
            <p className="text-gray-600">{client.policyId}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Enrollment Date</p>
            <p className="text-gray-600">
              {new Date(client.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Assigned Agent</p>
            <p className="text-gray-600">{client.agentId || 'Not assigned'}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Client Notes</h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-600"
              >
                Edit Notes
              </button>
            )}
          </div>
          {isEditing ? (
            <div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Add notes about the client..."
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateNotes}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Notes
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">
                {notes || 'No notes available'}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
            Schedule Follow-up
          </button>
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
            Update Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail; 