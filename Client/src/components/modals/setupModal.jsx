import React  from 'react';
import './setupModal.css'



const Modal  = ({ onClose, onNavigate }) => {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}> {/* Prevents click inside the modal from closing it */}
          <p>Hi Inspector, you successfully created a factory. You can keep editing your factory in the setup your factory section.</p>
          <button onClick={onNavigate}>Take me there</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
  export default Modal 