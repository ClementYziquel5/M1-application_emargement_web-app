import './Top.css';
import Header from '../Header/Header.js';
import Filtres from '../Filtres/Filtres.js';

function Top(){
    return (
        <div className="top">
            <Header />
            <Filtres />
        </div>
       
    );
}

export default Top;