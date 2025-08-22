import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ users, onLogin }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === loginData.username && u.password === loginData.password);
    
    if (user) {
      onLogin(loginData.username); // Call the function passed from App.js
      setLoginData({ username: '', password: '' });
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <div className="auth-container">
      <h1>Mini Instagram</h1>
      <div className="auth-form">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/signup">Sign up here</Link> {/* Use Link for navigation */}
        </p>
      </div>

      <div className="demo-accounts">
        <h3>Demo Accounts:</h3>
        <p>Username: demo | Password: demo123</p>
        <p>Username: test | Password: test123</p>
      </div>
    </div>
  );
};

export default Login;