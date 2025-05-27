import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientManagement.css';

const ClientManagement = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);
    const [testResult, setTestResult] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                // Get the token from localStorage
                const token = localStorage.getItem('token');
                console.log('Token from localStorage:', token ? `${token.substring(0, 15)}...` : 'No token found');
                
                if (!token) {
                    setError('Authentication required - No token found in localStorage');
                    setLoading(false);
                    return;
                }
                
                console.log('Fetching client data from API...');
                const response = await axios.get('http://localhost:5000/api/basic-questions', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                console.log('API response received:', response.status, response.statusText);
                console.log('Client data count:', response.data.length);
                
                setClients(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching clients:', err);
                
                // Collect detailed error information for debugging
                const errorDetails = {
                    message: err.message,
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    data: err.response?.data
                };
                
                setDebugInfo(JSON.stringify(errorDetails, null, 2));
                setError(`Failed to fetch client data: ${err.response?.data?.message || err.message}`);
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) {
        return <div className="loading">Loading client data...</div>;
    }

    // Function to test API connectivity
    const testApiConnection = async () => {
        try {
            // Test basic API connectivity (no auth required)
            const basicResponse = await axios.get('http://localhost:5000/api/basic-questions/test');
            
            // Test authenticated endpoint
            const token = localStorage.getItem('token');
            let authResponse = { data: 'Not tested - No token available' };
            
            if (token) {
                authResponse = await axios.get('http://localhost:5000/api/basic-questions/auth-test', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
            
            setTestResult({
                basicTest: basicResponse.data,
                authTest: authResponse.data,
                timestamp: new Date().toISOString()
            });
        } catch (err) {
            setTestResult({
                error: err.message,
                response: err.response?.data,
                timestamp: new Date().toISOString()
            });
        }
    };

    if (error) {
        return (
            <div className="client-management">
                <h2>Client Management</h2>
                <div className="error">
                    <p>{error}</p>
                    {debugInfo && (
                        <div className="debug-info">
                            <h4>Debug Information:</h4>
                            <pre>{debugInfo}</pre>
                        </div>
                    )}
                    <div className="error-actions">
                        <button 
                            className="retry-button"
                            onClick={() => {
                                setLoading(true);
                                setError(null);
                                setDebugInfo(null);
                                // Force a re-fetch
                                window.location.reload();
                            }}
                        >
                            Retry
                        </button>
                        <button 
                            className="test-button"
                            onClick={testApiConnection}
                        >
                            Test API Connection
                        </button>
                    </div>
                    
                    {testResult && (
                        <div className="test-results">
                            <h4>API Test Results:</h4>
                            <pre>{JSON.stringify(testResult, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // If no clients are found
    if (clients.length === 0) {
        return (
            <div className="client-management">
                <h2>Client Management</h2>
                <div className="no-clients">
                    <p>No client data available at this time.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="client-management">
            <h2>Client Management</h2>
            <div className="clients-count">
                <p>Total Clients: {clients.length}</p>
            </div>
            <div className="clients-grid">
                {clients.map((client) => (
                    <div key={client._id} className="client-card">
                        <div className="client-header">
                            <h3>{client.name}</h3>
                            <span className="client-email">{client.email}</span>
                        </div>
                        <div className="client-details">
                            <div className="detail-item">
                                <span className="detail-label">Age:</span>
                                <span className="detail-value">{client.age}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Gender:</span>
                                <span className="detail-value">{client.gender}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">BMI:</span>
                                <span className="detail-value">{client.bmi}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Income:</span>
                                <span className="detail-value">₹{client.income}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Smoker:</span>
                                <span className="detail-value">{client.smoker}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Dependents:</span>
                                <span className="detail-value">{client.dependents}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Hospital Visits:</span>
                                <span className="detail-value">{client.hospital_visits}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Chronic Disease:</span>
                                <span className="detail-value">{client.chronic_disease}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Pre-existing Conditions:</span>
                                <span className="detail-value">{client.pre_existing_conditions}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Result:</span>
                                <span className={`detail-value ${client.result === 'Yes' ? 'result-yes' : 'result-no'}`}>
                                    {client.result}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Probability:</span>
                                <span className="detail-value">{(client.probability * 100).toFixed(2)}%</span>
                            </div>
                        </div>
                        <div className="client-footer">
                            <span className="timestamp">
                                Last Updated: {new Date(client.updatedAt || client.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientManagement; 