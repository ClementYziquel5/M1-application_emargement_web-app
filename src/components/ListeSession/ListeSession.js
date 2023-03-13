import React, {useState, useEffect} from 'react';
import ConfirmationModal from '../Confirmation/Confirmation';

import './ListeSession.css'

/*
 * Composant ListeSession : permet d'afficher la liste des sessions filtrées
 *
 * props :
 * - sessions : liste des sessions
 * 
 * - setSession : permet de modifier la session sélectionnée
 * - setIdSession : permet de passer l'id de la session sélectionnée
 * 
 * - setEdit : permet de modifier l'état d'édition
 * - setVisu : permet de modifier l'état de visualisation
 */
function ListeSession(props){
    const [sessions, setSessions] = useState([]); // sessions = liste des sessions à afficher
    const [state, setState] = useState({ // state = état de la modal de confirmation de suppression
        showConfirmationModal: false,
        itemToDelete: null,
    });

    useEffect(() => { // Lorsque les sessions sont chargées on les affiche
        {props.sessions && setSessions(props.sessions) }
    }, [props.sessions]);

    // Delete session
    function handleDeleteClick(id) {
        setState({
          showConfirmationModal: true,
          itemToDelete: id,
        });
      };

    // Confirm delete
    function handleConfirmDelete(){
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/session/suppression';
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
              setSessions(sessions.filter(item => item.id !== state.itemToDelete)); // On supprime la session supprimée de la liste
            } else {
              throw new Error('DeleteSession error');
            }
          })
        .catch(error => {
            console.error('Error:', error);
        });

        setState({ // On ferme la modal de confirmation
            showConfirmationModal: false,
            itemToDelete: null,
        })
    }

    // Cancel delete
    function handleCancelDelete(){
        setState({ // On ferme la modal de confirmation
            showConfirmationModal: false,
            itemToDelete: null,
        })
    }

    // Edit session
    function handleEditClick(item){ 
        props.setSession(item); // On passe la session sélectionnée
        props.setEdit(true); // On passe l'état d'édition à true
    }

    return (
        <div className="listes">
            {sessions.map((item) =>
            <div className="infos-liste" key={item.id}>
                <div className="boutons-listeSession">
                    <img src="button-edit.png" className="bouton-edit" alt='Bouton edit' onClick={() => handleEditClick(item)}></img>
                    <img src="button-delete.png" className="bouton-poubelle" alt='Bouton suppression' onClick={() => handleDeleteClick(item.id)}></img>
                </div>
                <div className="cours-listeSession">
                    <div className="matiere-listeSession">
                        {item.matiere}
                    </div>
                    <div className="type-listeSession">
                        {item.type}
                    </div>
                </div>
                <div className="groupes-listeSession">
                    {item["groupes"].map((groupe) => 
                        <div className="groupe-listeSession" key={"groupe-"+groupe}>
                            {groupe}
                        </div>
                    )}
                </div>
                <div className="intervenants-listeSession">
                    {item["intervenants"].map((intervenant) =>
                        <div className="intervenant-listeSession" key={"intervenant-"+intervenant}>
                            {intervenant}
                        </div>
                    )}
                </div>
                <div className="salles-listeSession">
                    {item["salles"].map((salle) =>
                        <div className="salle-listeSession" key={"salle-"+salle}>
                            {salle}
                        </div>
                    )}
                </div>
                <div className="date-listeSession">
                    <div className="la-date-listeSession">
                        {item.date}
                    </div>
                </div>
                <div className="heure-listeSession">
                    <div className="heure-debut-listeSession">
                        {item.heureDebut}
                    </div>
                    <div className="heure-fin-listeSession">
                        {item.heureFin}
                    </div>
                </div>
                <div className="infos-listeSession">
                    <p className="voir-infos-listeSession" onClick={() => {props.setSession(item); props.setVisu(true); props.setIdSession(item.id)}}>Voir infos ➤</p>                
                </div>
            </div>
            )}
            <ConfirmationModal type="session" isOpen={state.showConfirmationModal} onRequestClose={handleCancelDelete} onConfirm={() => handleConfirmDelete()} />

        </div>
       
    );
}

export default ListeSession;