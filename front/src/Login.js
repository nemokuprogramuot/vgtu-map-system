import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from './api/auth';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token", data.token);
      navigate('/comments');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div>
     
      <form onSubmit={handleSubmit}>
      <h2>Prisijungti</h2>
        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    
    </div>
  );
}

export default Login;
