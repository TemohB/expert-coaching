import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirection après connexion
    } catch (err) {
      // Gestion des erreurs
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Mot de passe" 
        />
        <button type="submit">Connexion</button>
      </form>
      <button onClick={loginWithGoogle}>Connexion Google</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;