import React from 'react';
import Nav from './Nav.jsx';
import Tagline from './Tagline.jsx';
import Box from './Box.jsx';
import './Homepage.css';

function Homepage() {
  return (
    <>
      
      <div className="homepage-container">
        
        <Tagline />
        <div className="box-container">
          <Box title="Life Insurance Policy" />
          <Box title="Vehicle Insurance Policy" />
          <Box title="Health Insurance Policy" />
        </div>
      </div>
    </>
  );
}

export default Homepage;
