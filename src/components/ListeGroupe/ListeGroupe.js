import React, {useState, useEffect} from 'react';
import ConfirmationModal from '../Confirmation/Confirmation';
import CreationGroupe from '../CreationGroupe/CreationGroupe';

import './ListeGroupe.css'

/*
 * Composant ListeGroupe : permet d'afficher la liste des groupes
 *
 * props :
 * - groupes : liste des groupes
 * - updateGroupe : fonction pour mettre à jour la liste des groupes
 */
function ListeGroupe(props){
    const [groupes, setGroupes] = useState([]); // Liste des groupes
    const [etudiants, setEtudiants] = useState([]); // Liste des étudiants d'un groupe
    const [showEditForm, setShowEditForm] = useState(false); // Pour afficher le formulaire de modification
    const [showVoirMembres, setShowVoirMembres] = useState(false); // Pour afficher la liste des étudiants d'un groupe
    const [groupeToEditId, setGroupeToEditId] = useState(0); // Id du groupe à modifier lors du clic sur le bouton modifier
    const [groupeToShowId, setGroupeToShowId] = useState(0); // Id du groupe à afficher lors du clic sur le bouton voir membres
    const [groupeToEditNom, setGroupeToEditNom] = useState(null); // Nom du groupe à modifier lors du clic sur le bouton modifier
    const [state, setState] = useState({ // Pour la modal de confirmation de suppression
        showConfirmationModal: false,
        itemToDelete: null,
    });
    const [wait, setWait] = useState(false); // Pour attendre que les groupes soient chargés

    useEffect(() => { // Lorsque les groupes sont chargés on les affiche
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
                props.updateGroupe();
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
        setShowEditForm(false); // On cache le formulaire de modification si il est affiché
        if(groupeToShowId === id && showVoirMembres){ // Si on clique sur le même bouton une 2ème fois, on cache la liste des étudiants
            setShowVoirMembres(false); 
            return;
        }
        setShowVoirMembres(true); // On affiche la liste des étudiants
        setGroupeToShowId(id); // On stocke l'id du groupe pour savoir si on clique sur le même bouton
        getEtudiantsOfGroup(id,groupe); // On récupère les étudiants du groupe
    }

    function editGroupe(id,nom){ // Pour afficher le formulaire de modification
        setShowVoirMembres(false); // On cache la liste des étudiants si elle est affichée
        if(groupeToEditId === id && showEditForm){ // Si on clique sur le même bouton une 2ème fois, on cache le formulaire de modification
            setShowEditForm(false);
            return;
        }
        setShowEditForm(true); // On affiche le formulaire de modification
        getEtudiantsOfGroup(id); // On récupère les étudiants du groupe
        setGroupeToEditId(id); // On stocke l'id du groupe pour savoir si on clique sur le même bouton
        setGroupeToEditNom(nom); // On stocke le nom du groupe pour le passer au formulaire de modification
    } 

    return wait && ( // On attend que les groupes soient chargés
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