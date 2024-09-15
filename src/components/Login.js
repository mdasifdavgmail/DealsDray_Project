import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.username === username && user.password === password) {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login Page</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit">Login</button>
        </form>

        <div style={{ marginTop: '10px' }}>
          <p>Don't have an account?</p>
          <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
