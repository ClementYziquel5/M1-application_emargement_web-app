import './Connexion.css'

function Connexion(props){
    return (
        <div>
            <div className='connexion'>
                <div className='form-connexion'>
                    <form>
                        <label htmlFor='identifiant'>Connexion</label>
                        <input type='text' id='identifiant' placeholder='Identifiant CAS'></input>
                        <input type='text' id='password' placeholder='Mot de passe'></input>
                        <button>SE CONNECTER</button>
                    </form>
                </div>
                <div className='forgot-password'>
                    <a href='#'>Mot de passe oublié ?</a>
                </div>
                <div className='login-error'>
                    <p className='error-msg'>Les identifiants ne correspondent pas.</p>
                </div>
            </div>
        </div>
    );
}

export default Connexion;