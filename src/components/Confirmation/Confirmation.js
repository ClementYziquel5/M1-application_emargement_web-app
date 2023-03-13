import React from 'react';
import Modal from 'react-modal';
import './Confirmation.css';


/*
 * Modal de confirmation de suppression
 *
 * props :
 * - type : type de suppression (groupe ou session)
 * - isOpen : booléen qui permet de savoir si le modal est ouvert ou non
 * - onRequestClose : fonction qui permet de fermer le modal
 * - onConfirm : fonction qui permet de confirmer la suppression
 */
const ConfirmationModal = ({ type, isOpen, onRequestClose, onConfirm }) => {
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
      <h2>Confirmer la suppression</h2>  {/* On affiche un message différent selon le type de suppression (groupe ou session)*/}
      {type === 'groupe' && <p>Êtes-vous sûr de vouloir supprimer ce groupe?</p>} 
      {type === 'session' && <p>Êtes-vous sûr de vouloir supprimer cette session?</p>}
      <button onClick={onConfirm}>Supprimer</button>
      <button onClick={onRequestClose}>Annuler</button>
    </Modal>
  );
};

export default ConfirmationModal;