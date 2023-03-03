import React, {useState, useEffect} from 'react';
import ConfirmationModal from '../Confirmation/Confirmation';

import './ListeSession.css'

function ListeSession(props){
    const [sessions, setSessions] = useState([]);
    const [state, setState] = useState({
        showConfirmationModal: false,
        itemToDelete: null,
    });
    useEffect(() => {
        getTodaySessions();
    }, []);

    // get today sessions
    function getTodaySessions(){
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/sessions';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setSessions(data);
        })
        .catch(error => console.log(error));
    }

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
              getTodaySessions();
            } else {
              throw new Error('DeleteSession error');
            }
          })
        .catch(error => {
            console.error('Error:', error);
        });

        setState({
            showConfirmationModal: false,
            itemToDelete: null,
        })
    }

    // Cancel delete
    function handleCancelDelete(){
        setState({
            showConfirmationModal: false,
            itemToDelete: null,
        })
    }

    return (
        <div className="listes">
            {sessions.map((item) =>
            <div className="infos-liste" key={item.id}>
                <div className="boutons-listeSession">
                    <img src="button-edit.png" className="bouton-edit" alt='Bouton edit'></img>
                    <img src="button-delete.png" className="bouton-poubelle" alt='Bouton suppression' onClick={() => handleDeleteClick(item.id)}></img>
                    <ConfirmationModal isOpen={state.showConfirmationModal} onRequestClose={handleCancelDelete} onConfirm={() => handleConfirmDelete()} />
                </div>
                <div className="cours-listeSession">
                    <div className="matiere">
                        {item.matiere}
                    </div>
                    <div className="type">
                        {item.type}
                    </div>
                </div>
                <div className="groupes-listeSession">
                    {item["groupes"].map((groupe) => 
                        <div className="groupe">
                            {groupe}
                        </div>
                    )}
                </div>
                <div className="intervenants-listeSession">
                    {item["intervenants"].map((intervenant) =>
                        <div className="intervenant">
                            {intervenant}
                        </div>
                    )}
                </div>
                <div className="salles-listeSession">
                    {item["salles"].map((salle) =>
                        <div className="salle">
                            {salle}
                        </div>
                    )}
                </div>
                <div className="date-listeSession">
                    <div className="la-date">
                        {item.date}
                    </div>
                </div>
                <div className="heure-listeSession">
                    <div className="heure-debut">
                        {item.heureDebut}
                    </div>
                    <div className="heure-fin">
                        {item.heureFin}
                    </div>
                </div>
            </div>
            )}
        </div>
       
    );
}

export default ListeSession;