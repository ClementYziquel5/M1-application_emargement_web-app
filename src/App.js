import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate, Outlet} from 'react-router-dom';
import Header from './components/Header/Header.js';
import Filtres from './components/Filtres/Filtres.js';
import Listes from './components/Listes/Listes.js';
import CreationSession from './components/CreationSession/CreationSession.js';
import CreationGroupe from './components/CreationGroupe/CreationGroupe.js';
import Connexion from './components/Connexion/Connexion.js';
import { CasUserContextProvider, useCasUserContext } from './context/casUserContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user , setUser] = useState(null);

  const handleLogin = () => setUser({id: '1', identifiant: 'cyziqu24', isAdmin: false });
  const handleLogout = () => setUser(null);
  

  function PrivateRoute({ element, ...rest }) {
    const { is } = useCasUserContext();
    return isAuthenticated ? 
      (<Outlet />) : (<Navigate to="/connexion" replace />);
  }

  return (
    <CasUserContextProvider>
      <Router>
          <Routes>
            <Route element={<PrivateRoute user={user}></PrivateRoute>}>
              <Route element={<Header />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/groupes" element={<Groupes />} />
              <Route path="/creation" element={<Creation />} />
            </Route>

            <Route path='/connexion' element={<Connexion setIsAuthenticated={setIsAuthenticated} /> } /> 
            <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </CasUserContextProvider>
  );
}

const NotFound = () => (
  <div style={{textAlign:'center'}}>
    <h1>404</h1>
    <p>Page not found</p>
  </div>
);

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
