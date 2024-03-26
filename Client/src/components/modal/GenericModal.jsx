import React from "react";
import "./GenericModal.css";


export default function GenericModal({ children, isOpen, onRequestClose }) {
  return (
    <>
      <div className="FormContainer">
        <div className="ModalPositionContainer">
          {isOpen && (
            <div className="ModalBackground" onClick={() => onRequestClose()}>
              <div className="ModalBody" onClick={(e) => e.stopPropagation()}>
                {children}
                <div className="XButton" onClick={onRequestClose}>X</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
