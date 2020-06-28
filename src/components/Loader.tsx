import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fdr fjc height100">
      <div className='loading-image'>
        <img src="/assets/cdi-logo-white.png" alt="loading" />
        <div className="white loader">Loading...</div>
      </div>
    </div>
  )
};

export default Loader;
