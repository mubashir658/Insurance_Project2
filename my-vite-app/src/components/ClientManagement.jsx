import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientManagement.css';

const ClientManagement = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/basic-questions');
                setClients(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch client data');
                setLoading(false);
                console.error('Error fetching clients:', err);
            }
        };

        fetchClients();
    }, []);

    if (loading) {
        return <div className="loading">Loading client data...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="client-management">
            <h2>Client Management</h2>
            <div className="clients-grid">
                {clients.map((client) => (
                    <div key={client._id} className="client-card">
                        <div className="client-header">
                            <h3>{client.name}</h3>
                            <span className="client-email">{client.email}</span>
                        </div>
                        <div className="client-details">
                            <div className="detail-item">
                                <span className="detail-label">Gender:</span>
                                <span className="detail-value">{client.gender}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Area:</span>
                                <span className="detail-value">{client.area}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Qualification:</span>
                                <span className="detail-value">{client.qualification}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Income:</span>
                                <span className="detail-value">₹{client.income}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Marital Status:</span>
                                <span className="detail-value">{client.maritalStatus}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Policy Type:</span>
                                <span className="detail-value">{client.policyType}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Policies Chosen:</span>
                                <span className="detail-value">{client.policiesChosen}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Number of Policies:</span>
                                <span className="detail-value">{client.numberOfPolicies}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Claim Amount:</span>
                                <span className="detail-value">₹{client.claimAmount}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Vintage:</span>
                                <span className="detail-value">{client.vintage} years</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Result:</span>
                                <span className={`detail-value ${client.result === 'Yes' ? 'result-yes' : 'result-no'}`}>
                                    {client.result}
                                </span>
                            </div>
                        </div>
                        <div className="client-footer">
                            <span className="timestamp">
                                Added: {new Date(client.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientManagement; 