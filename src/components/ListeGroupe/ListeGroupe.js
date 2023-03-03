import { Box } from '@mui/system';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import ConfirmationModal from '../Confirmation/Confirmation';
import CreationGroupe from '../CreationGroupe/CreationGroupe';

import './ListeGroupe.css'

function ListeGroupe(props){
    const [groupes, setGroupes] = useState([]);
    const [etudiants, setEtudiants] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [groupeToEditId, setGroupeToEditId] = useState(null);
    const [groupeToEditNom, setGroupeToEditNom] = useState(null);
    const [state, setState] = useState({
        showConfirmationModal: false,
        itemToDelete: null,
    });
    useEffect(() => {
        getGroupes();
    }, []);

    function getGroupes(){
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/groupes';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setGroupes(data); 
        })
        .catch(error => console.log(error));
    }

    // Delete groupe
    function handleDeleteClickGroupe(id) {
        setState({
            showConfirmationModal: true,
            itemToDelete: id,
        });
    };


    // Cancel delete
    function handleCancelDelete(){
        setState({
          showConfirmationModal: false,
          itemToDelete: null,
        });
    }

    // Récupérer les étudiants d'un groupe
    function getEtudiantsOfGroup(id){
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/etudiants/groupe/' + id;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setEtudiants(data);
        })
        .catch(error => console.log(error));
    }
    
    // Confirm delete
    function handleConfirmDeleteGroupe(){
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/groupe/suppression';
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                id: state.itemToDelete
            }
            )
        })
        .then(response => {
            if (response.ok) {
                getGroupes();
            } else {
                throw new Error('DeleteGroupe error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
        setState({
            showConfirmationModal: false,
            itemToDelete: null,
        });
    }

    function handleUpdateGroupe(id, nom, etudiants){
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/groupe/miseajour';
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                nom: nom,
                ines: etudiants.map((item) => item.ine)
            })
        })
        .then(response => {
            if (response.ok) {
                getEtudiantsOfGroup();
            } else {
                throw new Error('UpdateGroupe error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    


    return (
        <div className='affichage-groupes'>
            <div className="groupes">
                {groupes.map((item) =>
                <div className="infos-groupe" key={item.id}>
                    <div className="bouton">
                        <img src="button-edit.png" className="bouton-edit" alt='Bouton edit' onClick={() => {
                            setShowEditForm(true);
                            getEtudiantsOfGroup(item.id);
                            setGroupeToEditId(item.id);
                            setGroupeToEditNom(item.groupe);
                        }}></img>
                        <img src="button-delete.png" className="bouton-poubelle" alt='Bouton suppression' onClick={() => handleDeleteClickGroupe(item.id,null)}></img>
                        <ConfirmationModal isOpen={state.showConfirmationModal} onRequestClose={handleCancelDelete} onConfirm={() => handleConfirmDeleteGroupe()} />
                    </div>
                    <div className="nom">
                        {item.groupe}
                    </div>
                    <div className="voir-membres">
                        <p className="voir-membres-button" onClick={() => {
                            setShowEditForm(false);
                            getEtudiantsOfGroup(item.id);
                            document.getElementById('nomGroupe').innerHTML = item.groupe;
                        }}>Voir les membres ➤</p>
                    </div>
                </div>
                )}
            </div>
            <div className="etudiants">
                {showEditForm ?
                    <CreationGroupe id={groupeToEditId} nom={groupeToEditNom} etudiants={etudiants} handleUpdateGroupe={handleUpdateGroupe}/>
                : 
                <Box>
                    <div id='nomGroupe' className='nomGroupe'></div>
                    <div className="infos-etudiant"> 
                        {etudiants.map((item) =>            
                            <div className="etudiant" key={item.ine} >
                                {item.nom.toUpperCase() + " " + item.prenom}
                            </div>
                        )}
                    </div>
                </Box>
                
                }
            </div>
        </div>
    );

}

export default ListeGroupe;