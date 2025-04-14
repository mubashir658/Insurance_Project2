import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import './UserDashboard.css'

const UserDashboard = () => {
  const [selectedPolicies, setSelectedPolicies] = useState(new Set())
  const navigate = useNavigate()

  const policies = [
    {
      id: 1,
      title: "Health Insurance",
      description: "Comprehensive medical coverage",
      premium: "800/month"
    },
    {
      id: 2,
      title: "Term Life Insurance",
      description: "Family financial protection",
      premium: "650/month"
    }
  ]

  const togglePolicy = (id) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      const newSelection = new Set(selectedPolicies)
      newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id)
      setSelectedPolicies(newSelection)
      navigate('/basic-questions')
    }
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1>Insurance Dashboard</h1>
        <div className="policy-grid">
          {policies.map(policy => (
            <div 
              key={policy.id}
              className={`policy-card ${selectedPolicies.has(policy.id) ? 'selected' : ''}`}
              onClick={() => togglePolicy(policy.id)}
            >
              <h3>{policy.title}</h3>
              <p>{policy.description}</p>
              <div className="premium">{policy.premium}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
