import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isInitialLoad) return;
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          return;
        }

        console.log('Fetching profile with token:', token);
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Profile response:', response.data);

        if (response.data.success) {
          const userData = response.data.data;
          // Update both context and form data
          updateUser({
            name: userData.fullName,
            email: userData.email,
            phone: userData.phone || '',
            address: userData.address || '',
            role: userData.role
          });
          setFormData({
            fullName: userData.fullName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            address: userData.address || ''
          });
          setError('');
        } else {
          setError(response.data.message || 'Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
          setError(error.response.data.message || 'Failed to fetch profile');
        } else if (error.request) {
          console.error('Error request:', error.request);
          setError('No response from server. Please check if the server is running.');
        } else {
          setError('Failed to fetch profile. Please try again.');
        }
      } finally {
        setIsInitialLoad(false);
      }
    };

    fetchProfile();
  }, [isInitialLoad, updateUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Updating profile with data:', formData);
      const response = await axios.put('http://localhost:5000/api/profile', {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Update response:', response.data);

      if (response.data.success) {
        const userData = response.data.data;
        // Update both context and form data
        updateUser({
          name: userData.fullName,
          email: userData.email,
          phone: userData.phone || '',
          address: userData.address || '',
          role: userData.role
        });
        setFormData({
          fullName: userData.fullName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || ''
        });

        alert('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError(error.response.data.message || 'Failed to update profile');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('No response from server. Please check if the server is running.');
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = () => {
    // Set form data from current user data when entering edit mode
    setFormData({
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(true);
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {error && <div className="error-message">{error}</div>}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Enter your address"
            />
          </div>
          <div className="button-group">
            <button 
              type="submit" 
              className="save-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="cancel-btn"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <div className="info-group">
            <label>Full Name:</label>
            <p>{user?.name || 'Not set'}</p>
          </div>
          <div className="info-group">
            <label>Email:</label>
            <p>{user?.email || 'Not set'}</p>
          </div>
          <div className="info-group">
            <label>Phone:</label>
            <p>{user?.phone || 'Not set'}</p>
          </div>
          <div className="info-group">
            <label>Address:</label>
            <p>{user?.address || 'Not set'}</p>
          </div>
          <button 
            onClick={handleEditClick} 
            className="edit-btn"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
