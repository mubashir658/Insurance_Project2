import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackManagement.css';

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'solved', 'pending'

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/feedback', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setFeedbacks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setError(error.response?.data?.message || 'Failed to fetch feedbacks');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (feedbackId, isSolved) => {
    try {
      console.log('Updating feedback status:', { feedbackId, isSolved });
      setUpdatingId(feedbackId);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found in localStorage');
        setError('Authentication required');
        return;
      }

      console.log('Making PATCH request to update feedback status');
      const response = await axios.patch(
        `http://localhost:5000/api/feedback/${feedbackId}`, 
        { isSolved },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Update response:', response.data);

      // Update the feedback in the local state
      setFeedbacks(feedbacks.map(feedback => 
        feedback._id === feedbackId ? { ...feedback, isSolved } : feedback
      ));

      // Show success message
      const status = isSolved ? 'solved' : 'pending';
      alert(`Feedback marked as ${status}`);
    } catch (error) {
      console.error('Error updating feedback status:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError(error.response?.data?.message || 'Failed to update feedback status');
      alert('Failed to update feedback status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filter === 'all') return true;
    if (filter === 'solved') return feedback.isSolved;
    if (filter === 'pending') return !feedback.isSolved;
    return true;
  });

  if (loading) {
    return <div className="loading">Loading feedbacks...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="feedback-management">
      <h2>Customer Feedbacks</h2>
      
      {/* Filter Controls */}
      <div className="filter-controls">
        <button 
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-button ${filter === 'solved' ? 'active' : ''}`}
          onClick={() => setFilter('solved')}
        >
          Solved
        </button>
      </div>

      {/* Feedback Stats */}
      <div className="feedback-stats">
        <div className="stat-item">
          <span className="stat-label">Total Feedbacks:</span>
          <span className="stat-value">{feedbacks.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pending:</span>
          <span className="stat-value">{feedbacks.filter(f => !f.isSolved).length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Solved:</span>
          <span className="stat-value">{feedbacks.filter(f => f.isSolved).length}</span>
        </div>
      </div>

      <div className="feedback-list">
        {filteredFeedbacks.length === 0 ? (
          <p className="no-feedbacks">No feedbacks available</p>
        ) : (
          filteredFeedbacks.map(feedback => (
            <div key={feedback._id} className={`feedback-card ${feedback.isSolved ? 'solved' : 'pending'}`}>
              <div className="feedback-header">
                <div className="feedback-user">
                  <span className="user-name">{feedback.userId?.name || 'Anonymous'}</span>
                  <span className="user-email">{feedback.userId?.email || 'No email'}</span>
                </div>
                <div className="feedback-date">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="feedback-content">
                {feedback.feedbackText}
              </div>
              <div className="feedback-actions">
                <button
                  className={`status-button ${feedback.isSolved ? 'solved' : 'pending'}`}
                  onClick={() => handleStatusUpdate(feedback._id, !feedback.isSolved)}
                  disabled={updatingId === feedback._id}
                >
                  {updatingId === feedback._id ? (
                    'Updating...'
                  ) : feedback.isSolved ? (
                    'Mark as Pending'
                  ) : (
                    'Mark as Solved'
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackManagement; 