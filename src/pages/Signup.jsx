import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing users from localStorage or empty array
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Validation: confirm password match
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Validation: password length
    if (signupData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    // Check if username already exists
    const userExists = storedUsers.find(
      (u) => u.username === signupData.username
    );
    if (userExists) {
      alert("Username already exists! Please choose a different one.");
      return;
    }

    // Create new user
    const newUser = {
      username: signupData.username,
      password: signupData.password
    };

    // Save new user to localStorage
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    alert("Account created successfully! Welcome to Mini Instagram!");

    // Reset form
    setSignupData({
      username: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="auth-container">
      <h1>Mini Instagram</h1>
      <div className="auth-form">
        <h2>Create New Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Choose a username"
            value={signupData.username}
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password (min. 6 characters)"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={signupData.confirmPassword}
            onChange={(e) =>
              setSignupData({ ...signupData, confirmPassword: e.target.value })
            }
            required
          />
          <button type="submit">Create Account</button>
        </form>
        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
