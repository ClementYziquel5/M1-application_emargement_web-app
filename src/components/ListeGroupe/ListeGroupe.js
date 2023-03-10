import React, {useState, useEffect} from 'react';
import ConfirmationModal from '../Confirmation/Confirmation';
import CreationGroupe from '../CreationGroupe/CreationGroupe';

import './ListeGroupe.css'

function ListeGroupe(props){
    const [groupes, setGroupes] = useState([]);
    const [etudiants, setEtudiants] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showVoirMembres, setShowVoirMembres] = useState(false);
    const [groupeToEditId, setGroupeToEditId] = useState(0);
    const [groupeToShowId, setGroupeToShowId] = useState(0);
    const [groupeToEditNom, setGroupeToEditNom] = useState(null);
    const [state, setState] = useState({
        showConfirmationModal: false,
        itemToDelete: null,
    });
    const [wait, setWait] = useState(false);

    useEffect(() => {
        setGroupes(props.groupes);
        setWait(true);
    }, []);

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
    function getEtudiantsOfGroup(id,groupe){
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/etudiants/groupe/' + id;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setEtudiants(data);
            document.getElementById('nomGroupe').innerHTML = groupe;
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
                setGroupes(groupes.filter(item => item.id !== state.itemToDelete));
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

    function voirMembres(id,groupe){
        setShowEditForm(false);
        if(groupeToShowId === id && showVoirMembres){
            setShowVoirMembres(false);
            return;
        }
        setShowVoirMembres(true);
        setGroupeToShowId(id);
        getEtudiantsOfGroup(id,groupe);
    }

    function editGroupe(id,nom){
        setShowVoirMembres(false);
        if(groupeToEditId === id && showEditForm){
            setShowEditForm(false);
            return;
        }
        setShowEditForm(true);
        getEtudiantsOfGroup(id);
        setGroupeToEditId(id);
        setGroupeToEditNom(nom);
    }

    return wait && (
        <div className='affichage-groupes'>
            <div className="groupes">
                {groupes.map((item) =>
                <div className="infos-groupe" key={item.id}>
                    <div className="bouton">
                        <img src="button-edit.png" className="bouton-edit" alt='Bouton edit' onClick={() => {
                            editGroupe(item.id,item.groupe);
                        }}></img>
                        <img src="button-delete.png" className="bouton-poubelle" alt='Bouton suppression' onClick={() => handleDeleteClickGroupe(item.id,null)}></img>
                    </div>
                    <div className="nom">
                        {item.groupe}
                    </div>
                    <div className="voir-membres">
                        <p className="voir-membres-button" onClick={() => {
                            voirMembres(item.id, item.groupe);
                        }}>Voir les membres ➤</p>
                    </div>
                </div>
                )}
                <ConfirmationModal type="groupe" isOpen={state.showConfirmationModal} onRequestClose={handleCancelDelete} onConfirm={() => handleConfirmDeleteGroupe()} />
            </div>
            <div className="etudiants">
                {showEditForm ?
                    <CreationGroupe setShowEditForm={setShowEditForm} id={groupeToEditId} nom={groupeToEditNom} etudiants={etudiants} getEtudiantsOfGroup={getEtudiantsOfGroup}/>
                : 
                showVoirMembres &&
                    <div>
                        <div id='nomGroupe' className='nomGroupe'></div>
                        <div className="infos-etudiant"> 
                            {etudiants.map((item) =>            
                                <div className="etudiant" key={item.ine} >
                                    {item.nom.toUpperCase() + " " + item.prenom}
                                </div>
                            )}
                        </div>
                    </div>
                
                }
            </div>
        </div>
    );

}

export default ListeGroupe;