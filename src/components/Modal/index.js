import React from 'react';
import './styles.scss';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    
    return (
        <>
            <div className="modalOverlay" onClick={onClose}/>
            <div className="modal">
                {children}
            </div>
        </>
    )
}

export default Modal;