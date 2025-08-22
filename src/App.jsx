import { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {
  // State for authentication (Lifted up to the main App)
  const [currentUser, setCurrentUser] = useState(null);
  
  // State for user storage (simulating a database)
  const [users, setUsers] = useState([
    { username: 'demo', password: 'demo123' },
    { username: 'test', password: 'test123' }
  ]);

  // State to manage all posts
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

  // Refs for file inputs
  const fileInputRef = useRef(null);

  // Authentication Functions (These are passed down as props)
  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleSignup = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUser(newUser.username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="app">
        {/* Routes decide which component to show based on the URL */}
        <Routes>
          {/* If user is logged in, redirect from login/signup to home. Otherwise, show the page. */}
          <Route 
            path="/login" 
            element={currentUser ? <Navigate to="/" /> : <Login users={users} onLogin={handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={currentUser ? <Navigate to="/" /> : <Signup users={users} onSignup={handleSignup} />} 
          />
          {/* Protect the Home route: if not logged in, redirect to login. */}
          <Route 
            path="/" 
            element={currentUser ? <Home 
                                      currentUser={currentUser} 
                                      onLogout={handleLogout}
                                      posts={posts}
                                      setPosts={setPosts}
                                      fileInputRef={fileInputRef}
                                    /> 
                                  : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;