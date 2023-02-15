import './Listes.css'

function Listes(){
    const groupes = [1, 2, 3, 4, 5, 6, 7];
    return (
        <div className="listes">
            {groupes.map((groupe,index) =>
            <div className="infos-liste">
                <div className="bouton">
                    <img src="button-edit.png" className="bouton-edit" alt='Bouton edit'></img>
                    <img src="button-delete.png" className="bouton-poubelle" alt='Bouton edit'></img>
                </div>
                <div className="cours">
                    <div className="matiere">
                        Framework
                    </div>
                    <div className="type">
                        Travaux pratiques
                    </div>
                </div>
                <div className="groupes-liste">
                    <div>
                        M1 Groupe 5
                    </div>
                    <div>
                        M1 Groupe 4
                    </div>
                </div>
                <div className="intervenants">
                    <div>
                        Didier LE FOLL
                    </div>
                    <div>
                        Christophe VIGNAUD
                    </div>
                </div>
                <div className="salle">
                    <div className="la-salle">
                        S136C
                    </div>
                </div>
                <div className="date">
                    <div className="la-date">
                        16/01/23
                    </div>
                </div>
                <div className="heure">
                    <div class="heure-debut">
                        09h00
                    </div>
                    <div className="heure-fin">
                        10h30
                    </div>
                </div>
            </div>
            )}
        </div>
       
    );
}

export default Listes;