import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (u) => u.username === loginData.username && u.password === loginData.password
    );

    if (user) {
      // Save current user to localStorage
      localStorage.setItem("currentUser", JSON.stringify({ username: user.username }));

      // Call parent handler (App.jsx) to update state
      onLogin(user.username);

      // Clear form
      setLoginData({ username: '', password: '' });

      // Redirect to home
      navigate("/");
    } else {
      alert("Invalid username or password!");
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
          Don't have an account?{" "}
          <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
