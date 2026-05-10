import React, { useState } from "react";
import "./Health.css";

const Health = () => {
  const [selectedGender, setSelectedGender] = useState("Male");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMoreMembers, setShowMoreMembers] = useState(false);

  const membersList = {
    Male: ["Self", "Wife", "Son", "Daughter"],
    Female: ["Self", "Husband", "Son", "Daughter"],
  };

  const extendedMembers = ["Father", "Mother", "Father-in-law", "Mother-in-law"];

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setSelectedMember(null);
  };

  const handleMemberSelect = (member) => {
    setSelectedMember(member === selectedMember ? null : member);
  };

  const handleContinue = () => {
    if (!selectedMember) {
      alert("Please select a member to insure");
      return;
    }
    // Add your continue logic here
    console.log(`Selected: ${selectedGender} - ${selectedMember}`);
  };

  return (
    <div className="health-container">
      <h1 className="health-title">
        Find top plans for you with up to <span className="health-discount">25% discount</span>
      </h1>

      <div className="health-toggle-container" role="radiogroup" aria-labelledby="gender-label">
        <p id="gender-label" className="health-section-label">Select your gender</p>
        <div className="health-toggle-buttons">
          {["Male", "Female"].map((gender) => (
            <button
              key={gender}
              className={`health-toggle-btn ${selectedGender === gender ? "active" : ""}`}
              onClick={() => handleGenderChange(gender)}
              aria-pressed={selectedGender === gender}
              role="radio"
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      <p className="health-section-label">Select one member you want to insure</p>

      <div className="health-members-grid">
        {membersList[selectedGender].map((member) => (
          <button
            key={member}
            className={`health-member-card ${selectedMember === member ? "selected" : ""}`}
            onClick={() => handleMemberSelect(member)}
            aria-pressed={selectedMember === member}
          >
            {member}
          </button>
        ))}
      </div>

      <button 
        className="health-more-members-btn" 
        onClick={() => setShowMoreMembers(!showMoreMembers)}
        aria-expanded={showMoreMembers}
      >
        {showMoreMembers ? "Fewer members" : "More members"} {showMoreMembers ? "▲" : "▼"}
      </button>

      {showMoreMembers && (
        <div className="health-members-grid">
          {extendedMembers.map((member) => (
            <button
              key={member}
              className={`health-member-card ${selectedMember === member ? "selected" : ""}`}
              onClick={() => handleMemberSelect(member)}
              aria-pressed={selectedMember === member}
            >
              {member}
            </button>
          ))}
        </div>
      )}

      <button 
        className="health-continue-btn" 
        onClick={handleContinue}
        disabled={!selectedMember}
      >
        Continue
      </button>

      <p className="health-disclaimer">
        By clicking on "Continue", you agree to our{" "}
        <a href="#" className="health-link">Privacy Policy</a>,{" "}
        <a href="#" className="health-link">Terms of Use</a> &{" "}
        <a href="#" className="health-link">Disclaimer</a>
      </p>
    </div>
  );
};

export default Health;