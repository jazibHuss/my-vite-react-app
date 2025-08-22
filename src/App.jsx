import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'instagram',
      imageUrl: 'https://picsum.photos/seed/picsum/500/500',
      caption: 'Beautiful landscape!',
      likes: [],
      comments: [
        { id: 1, text: 'Wow! Amazing shot!' },
        { id: 2, text: 'Love this place!' }
      ],
      newComment: ''
    }
  ]);
  const fileInputRef = useRef(null);

  // Load currentUser from localStorage on first render
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser.username);
    }
  }, []);

  const handleLogin = (username) => {
    setCurrentUser(username);
    localStorage.setItem("currentUser", JSON.stringify({ username }));
  };

  const handleSignup = (newUser) => {
    // Save new user in localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Log them in
    setCurrentUser(newUser.username);
    localStorage.setItem("currentUser", JSON.stringify({ username: newUser.username }));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/login" 
            element={currentUser ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={currentUser ? <Navigate to="/" /> : <Signup onSignup={handleSignup} />} 
          />
          <Route 
            path="/" 
            element={currentUser ? (
              <Home
                currentUser={currentUser}
                onLogout={handleLogout}
                posts={posts}
                setPosts={setPosts}
                fileInputRef={fileInputRef}
              />
            ) : (
              <Navigate to="/login" />
            )} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
