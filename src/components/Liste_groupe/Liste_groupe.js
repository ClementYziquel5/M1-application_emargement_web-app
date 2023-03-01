import React, {useState, useEffect} from 'react';
import ConfirmationModal from '../Confirmation/Confirmation';

import './Liste_groupe.css'

function Liste_groupe(props){
    const [groupes, setGroupes] = useState([]);
    const [etudiants, setEtudiants] = useState([]);
    const [state, setState] = useState({
        showConfirmationModal: false,
        itemToDelete: null,
        idGroupe: null,
    });
    useEffect(() => {
        GetGroupes();
    }, []);

    function GetGroupes(){
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/groupes';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setGroupes(data); 
        })
        .catch(error => console.log(error));
    }

    // Delete etudiant
    function handleDeleteClickEtudiant(id, idGroupe=null) {
        setState({
          showConfirmationModal: true,
          itemToDelete: id,
          idGroupe: idGroupe,
        });
    }

    // Delete groupe
    function handleDeleteClickGroupe(id) {
        setState({
            showConfirmationModal: true,
            itemToDelete: id,
            idGroupe: null,
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
    function GetEtudiantsOfGroup(id){
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
                GetGroupes();
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

    function handleConfirmDeleteEtudiant(){
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/etudiant/suppression';
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idGroupe: state.idGroupe,
                ines: [state.itemToDelete]
            }
            )
        })
        .then(response => {
            if (response.ok) {
                GetEtudiantsOfGroup();
            } else {
                throw new Error('DeleteEtudiant error');
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
    


    return (
        <div className='affichage-groupes'>
            <div className="groupes">
                {groupes.map((item) =>
                <div className="infos-groupe" key={item.id}>
                    <div className="bouton">
                        <img src="button-edit.png" className="bouton-edit" alt='Bouton edit'></img>
                        <img src="button-delete.png" className="bouton-poubelle" alt='Bouton suppression' onClick={() => handleDeleteClickGroupe(item.id,null)}></img>
                        <ConfirmationModal isOpen={state.showConfirmationModal} onRequestClose={handleCancelDelete} onConfirm={() => handleConfirmDeleteGroupe()} />
                    </div>
                    <div className="nom">
                        {item.groupe}
                    </div>
                    <div className="voir-membres">
                        <p className="voir-membres-button" onClick={() => {
                            GetEtudiantsOfGroup(item.id);
                            document.getElementById('nomGroupe').innerHTML = item.groupe;
                            document.getElementById('nomGroupe').accessKey = item.id;
                        }}>Voir les membres</p>
                    </div>
                </div>
                )}
            </div>
            <div className="etudiants">
                <div><p id='nomGroupe' className='nomGroupe'></p></div>
                {etudiants.map((item) =>
                    <div className="infos-etudiant" key={item.id}>
                        <div className="bouton">
                            <img src="button-delete.png" className="bouton-poubelle" alt='Bouton suppression' onClick={() => handleDeleteClickEtudiant(item.id,document.getElementById('nomGroupe').accessKey )}></img>
                            <ConfirmationModal isOpen={state.showConfirmationModal} onRequestClose={handleCancelDelete} onConfirm={() => handleConfirmDeleteEtudiant()} />
                        </div>
                        
                        <div className="etudiant">
                            {item.nom + " " + item.prenom}
                        </div>
                    </div>
                )}
            </div>
        </div>

       
    );

}

export default Liste_groupe;