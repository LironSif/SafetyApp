import React from 'react';
import { useNavigate } from 'react-router-dom';
import './setupModal.css';

const Modal = ({ onClose }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/getting-started/setup');
        onClose(); // Optionally close the modal upon navigation
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <p>Hi Inspector, you successfully created a factory. You can keep editing your factory in the setup your factory section.</p>
                <button className="modal-navigate-btn" onClick={handleNavigate}>Take me there</button>
                <button className="modal-close-btn" onClick={onClose}>Not now</button>
            </div>
        </div>
    );
};

export default Modal;
