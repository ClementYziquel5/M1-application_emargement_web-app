import React, {useState, useEffect} from 'react';
import ConfirmationModal from '../Confiramtion/Confirmation';

import './Listes.css'

function Listes(props){
    const [sessions, setSessions] = useState([]);
    const [state, setState] = useState({
        showConfirmationModal: false,
        itemToDelete: null,
    });
    useEffect(() => {
        GetTodaySessions();
    }, []);

    // Get today sessions
    function GetTodaySessions(){
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/sessions';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setSessions(data);console.log(data);
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
              GetTodaySessions();
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
                <div className="bouton">
                    <img src="button-edit.png" className="bouton-edit" alt='Bouton edit'></img>
                    <img src="button-delete.png" className="bouton-poubelle" alt='Bouton suppression' onClick={() => handleDeleteClick(item.id)}></img>
                    <ConfirmationModal isOpen={state.showConfirmationModal} onRequestClose={handleCancelDelete} onConfirm={() => handleConfirmDelete()} />
                </div>
                <div className="cours">
                    <div className="matiere">
                        {item.matiere}
                    </div>
                    <div className="type">
                        {item.type}
                    </div>
                </div>
                <div className="groupes-liste">
                    {item["groupes"].map((groupe) => 
                        <div className="groupe">
                            {groupe}
                        </div>
                    )}
                </div>
                <div className="intervenants">
                    {item["intervenants"].map((intervenant) =>
                        <div className="intervenant">
                            {intervenant}
                        </div>
                    )}
                </div>
                <div className="salles">
                    {item["salles"].map((salle) =>
                        <div className="salle">
                            {salle}
                        </div>
                    )}
                </div>
                <div className="date">
                    <div className="la-date">
                        {item.date}
                    </div>
                </div>
                <div className="heure">
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

export default Listes;