import React from 'react';

const LoadingModal: React.FC = () => {
  return (
    <div className="loading-modal-overlay">
      <div className="loading-modal">
        <div className="spinner"></div>
        <p className="modal-text">
          🧠 Performing Multilingual Warrior Classification 🥷🏼 <br />
          🔄 Realizando clasificación multilingüe de guerrero...
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;
