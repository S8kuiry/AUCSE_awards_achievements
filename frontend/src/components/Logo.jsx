import React from 'react';

const Logo = ({ size = 36 }) => {
  return (
    <div
      style={{ fontSize: `${size}px` }}
      className="font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700"
    >
      ADAMAS <span className="ml-1 font-light tracking-widest">UNIVERSITY</span>
    </div>
  );
};

export default Logo;
