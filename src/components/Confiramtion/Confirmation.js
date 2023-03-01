import React from 'react';
import Modal from 'react-modal';
import './Confirmation.css';

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          textAlign: 'center',
        },
      }}
    >
      <h2>Confirmer la suppression</h2>
      <p>Êtes-vous sûr de vouloir supprimer cette session?</p>
      <button onClick={onConfirm}>Supprimer</button>
      <button onClick={onRequestClose}>Annuler</button>
    </Modal>
  );
};

export default ConfirmationModal;