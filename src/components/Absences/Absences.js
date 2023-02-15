import './Absences.css'
import '../Listes/Listes.css'

function Absences(){
    return (
        <div className="">
            <div className="listes">
                <div className="element-liste">
                    <div className="infos-liste">
                        <div className="bouton">
                            <img src="bouton-edit.png" className="bouton-edit" alt='Bouton edit'></img>
                            <img src="bouton-poubelle.png" className="bouton-poubelle" alt='Bouton edit'></img>
                        </div>
                        <div className="cours">
                            <div className="matiere">
                                Framework
                            </div>
                            <div className="type">
                                Travaux pratiques
                            </div>
                        </div>
                        <div className="groupes">
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
                            <div class="la-salle">
                                S136C
                            </div>
                        </div>
                        <div className="date">
                            <div class="la-date">
                                16/01/23
                            </div>
                        </div>
                        <div className="heure">
                            <div class="heure-debut">
                                09h00
                            </div>
                            <div class="heure-fin">
                                10h30
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absences">
                <div className="groupes-absences">
                    <div className="groupe">
                        M1B Groupe 5
                    </div>
                    <div className="element-absences">
                        <div className="nom">
                            LE CAM Yohann
                        </div>
                        <div className="presence">
                            Absent
                        </div>
                    </div>
                    <div className="element-absences">
                        <div className="nom">
                            LE CAM Yohann
                        </div>
                        <div className="presence">
                            Absent
                        </div>
                    </div>
                    <div className="element-absences">
                        <div className="nom">
                            LE CAM Yohann
                        </div>
                        <div className="presence">
                            Absent
                        </div>
                    </div>
                    <div className="element-absences">
                        <div className="nom">
                            LE CAM Yohann
                        </div>
                        <div className="presence">
                            Absent
                        </div>
                    </div>
                </div>
                <div className="groupes-absences">
                    <div className="groupe">
                        M1B Groupe 5
                    </div>
                    <div className="element-absences">
                        <div className="nom">
                            LE CAM Yohann
                        </div>
                        <div className="presence">
                            Absent
                        </div>
                    </div>
                    <div className="element-absences">
                        <div className="nom">
                            LE CAM Yohann
                        </div>
                        <div className="presence">
                            Absent
                        </div>
                    </div>
                    <div className="element-absences">
                        <div className="nom">
                            LE CAM Yohann
                        </div>
                        <div className="presence">
                            Absent
                        </div>
                    </div>
                </div>
                <div className="groupes-absences">
                    <div className="groupe">
                        M1B Groupe 5
                    </div>
                    <div className="element-absences">
                        <div className="nom">
                            LE CAM Yohann
                        </div>
                        <div className="presence">
                            Absent
                        </div>
                    </div>
                    <div className="element-absences">
                        <div className="nom">
                            LE CAM Yohann
                        </div>
                        <div className="presence">
                            Absent
                        </div>
                    </div>
                    <div className="element-absences">
                        <div className="nom">
                            LE CAM Yohann
                        </div>
                        <div className="presence">
                            Absent
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Absences;