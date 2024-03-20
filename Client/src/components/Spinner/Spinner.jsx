// import React from 'react';
// import './Spinner.css'; // Import the CSS for styling

// const Spinner = () => (
//   <div className="spinner-container">
//     <div className="spinner"></div>
//   </div>
// );

// export default Spinner;
import React from 'react';
import './Spinner.css'; // Make sure the CSS file is correctly imported

const Spinner = ({ circleSpeed = '1s', squareSpeed = '1.5s', triangleSpeed = '2s', rotationSpeed = '3s' }) => {
  return (
    <div className="spinner-container" style={{ ['--rotation-speed']: rotationSpeed }}>
      <div className="shape circle" style={{ ['--animation-speed']: circleSpeed }}></div>
      <div className="shape square" style={{ ['--animation-speed']: squareSpeed }}></div>
      <div className="shape triangle" style={{ ['--animation-speed']: triangleSpeed }}></div>
      <div className="shape circle-to-square" style={{ ['--animation-speed']: squareSpeed }}></div>
    </div>
  );
};

export default Spinner;
