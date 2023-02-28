import React, { useEffect,useState, useContext} from 'react';
import { Box } from 'rebass';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Header from './components/Header/Header.js';
import Filtres from './components/Filtres/Filtres.js';
import Listes from './components/Listes/Listes.js';
import CreationSession from './components/CreationSession/CreationSession.js';
import CreationGroupe from './components/CreationGroupe/CreationGroupe.js';
import Connexion from './components/Connexion/Connexion.js';
import { CasUserContext, CasUserContextProvider } from './context/casUserContext';
import useCas from './hooks/useCas.js';

function App() {
  return (
    <CasUserContextProvider>
      <Router>
          <Routes>
            <Route path='/login' element={<Connexion_layout/>} />
            <Route exact path="/sessions" element={<Sessions />} />
            <Route exact path="/groupes" element={<Groupes />} />
            <Route exact path="/creation" element={<Creation />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </Router>
    </CasUserContextProvider>
  );
}

function Layout(props){
  const navigate = useNavigate();
  const [securityChecked, setSecurityChecked] = useState(false);
  const casUserContext = useContext(CasUserContext);

  useEffect(() => {
    if (props.isSecure && !casUserContext.user) { // si la page nécessite une authentification et que l'utilisateur n'est pas connecté
      navigate('/login'); // on le redirige vers la page de connexion
    }else{
      setSecurityChecked(true); // sinon on indique que la sécurité a été vérifiée
    }
  }, [props.isSecure,casUserContext.user]); // on vérifie à chaque fois que la page change ou que l'utilisateur se connecte

  return (
    <Box align="center" background={props.background} fill> 
      <Box justify="center" align="center"> 
        {props.children} 
      </Box>
    </Box>  );
}

function Connexion_layout(){
  const navigate = useNavigate(); 
  const cas = useCas(true); 
  const casUserContext = useContext(CasUserContext); 

  useEffect(() => {
    if (casUserContext.user) { // si l'utilisateur est connecté
      navigate('/'); // on le redirige vers la page des sessions
    }
  }, [casUserContext.user]); // on vérifie à chaque fois que l'utilisateur se connecte

  return (
    <Layout background="status-unknown" isSecure={false}> 
      {!cas.isLoading && (  // si le chargement de l'authentification est terminé
        <Box align="center" gap="xsmall"> 
          
        </Box>
       )}
       <Connexion/> 
    </Layout>
  );
}

function Sessions(){
  const cas = useCas();
  const casUserContext = useContext(CasUserContext);

  return (
    <Layout background="status-ok" isSecure={false}>
      <Header logout={cas}/>
      <Filtres />
      <Listes />
    </Layout>
  );
}

function Groupes(){
  const cas = useCas();
  const casUserContext = useContext(CasUserContext);

  return (
    <Layout background="status-ok" isSecure={true}>
      <Header logout={cas}/>
      <Filtres />
    </Layout>
  );
}

function Creation(){
  const cas = useCas();
  const casUserContext = useContext(CasUserContext);

  return (
    <Layout background="status-ok" isSecure={true}>
      <Header logout={cas}/>
      <div className="creation">
        <CreationSession />
        <CreationGroupe />
      </div>
    </Layout>
  );
}

const NotFound = () => (
  <div style={{textAlign:'center'}}>
    <h1>404</h1>
    <p>Page not found</p>
  </div>
);


export default App;
