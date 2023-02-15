import './Groupes.css'

function Groupes(){
    const groupes = [1, 2, 3, 4];
    return (
        <div className="groupes">


        {groupes.map((groupe,index) =>
           <div className="element-liste" id={groupes[index]}>
                <div className="boutons">
                    <img src="bouton-edit.png" className="bouton-edit" alt='Bouton edit'></img>
                    <img src="bouton-poubelle.png" className="bouton-poubelle" alt='Bouton edit'></img>
                </div>
                <div className="groupe">
                    M1 Brest Groupe {groupes[index]}
                </div>
                <div className="affiche">
                    <div>
                        Afficher les membres
                    </div>
                </div>
            </div>
        )}

            

            
        </div>
       
    );
}

export default Groupes;