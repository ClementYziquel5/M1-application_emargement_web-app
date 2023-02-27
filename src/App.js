import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate} from 'react-router-dom';
import Header from './components/Header/Header.js';
import Filtres from './components/Filtres/Filtres.js';
import Listes from './components/Listes/Listes.js';
import CreationSession from './components/CreationSession/CreationSession.js';
import CreationGroupe from './components/CreationGroupe/CreationGroupe.js';
import Connexion from './components/Connexion/Connexion.js';
import { CasUserContextProvider, useCasUserContext } from './context/casUserContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <CasUserContextProvider>
      <Router>
        <div>
          <Routes>
            {!(isAuthenticated) ? <Route path='/connexion' element={<Connexion setIsAuthenticated={setIsAuthenticated} /> } /> : <Route element={<Header />} /> }
            <Route 
              path="/" 
              element={<PrivateRoute path='/' element={<Home />} />}
            />
            <Route 
              path="/sessions"
              element={ <PrivateRoute path='/sessions' element={<Sessions />} /> }
            />
            <Route
              path="/groupes"
              element={<PrivateRoute path='/groupe' element={<Groupes />} />}
            />
            <Route
              path="/creation"
              element={ <PrivateRoute path='/creation' element={<Creation />} />}
            />
          </Routes>
        </div>
      </Router>
    </CasUserContextProvider>
  );
}
function PrivateRoute({ element, ...rest }) {
  const { user } = useCasUserContext();
  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/connexion" replace />
  );
}


const Home = () => (
  <div>

  </div>
);

const Sessions = () => (
  <div>
    <Filtres />
    <Listes />
  </div>
);
const Groupes = () => (
  <div>
    <Filtres />
  </div>
);
const Creation = () => (
  <div className="creation">
    <CreationSession />
    <CreationGroupe />
  </div>
);

export default App;
