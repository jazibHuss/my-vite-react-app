import { useState } from 'react';

const Home = ({ currentUser, onLogout, posts, setPosts, fileInputRef }) => {
  // State for creating a new post (Moved here from App.js as it's only used on the Home page)
  const [newPost, setNewPost] = useState({
    imageFile: null,
    imagePreview: '',
    caption: ''
  });

  // Function to handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setNewPost({
        ...newPost,
        imageFile: file,
        imagePreview: imagePreview
      });
    }
  };

  // Function to handle creating a new post
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.imageFile) {
      alert('Please select an image first!');
      return;
    }
    if (newPost.caption.trim()) {
      const newPostObj = {
        id: posts.length + 1,
        username: currentUser,
        imageUrl: newPost.imagePreview,
        caption: newPost.caption,
        likes: [],
        comments: [],
        newComment: ''
      };
      setPosts([newPostObj, ...posts]);
      setNewPost({ imageFile: null, imagePreview: '', caption: '' });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      alert('Please write a caption!');
    }
  };

  // Function to handle liking and unliking a post
  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const userAlreadyLiked = post.likes.includes(currentUser);
        if (userAlreadyLiked) {
          return { ...post, likes: post.likes.filter(username => username !== currentUser) };
        } else {
          return { ...post, likes: [...post.likes, currentUser] };
        }
      }
      return post;
    }));
  };

  // Function to handle adding a comment
  const handleAddComment = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.newComment.trim()) {
        const newCommentObj = { id: post.comments.length + 1, text: post.newComment };
        return { ...post, comments: [...post.comments, newCommentObj], newComment: '' };
      }
      return post;
    }));
  };

  return (
    <>
      <h1>Mini Instagram</h1>
      {/* User Section */}
      <div className="user-section">
        <p>Welcome, <strong>{currentUser}</strong>!</p>
        <button onClick={onLogout} className="logout-btn"> {/* Use passed prop */}
          Logout
        </button>
      </div>

      {/* New Post Creation Section */}
      <div className="create-post">
        <h2>Create New Post</h2>
        <form onSubmit={handleCreatePost}>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          {newPost.imagePreview && (
            <div className="image-preview">
              <img src={newPost.imagePreview} alt="Preview" />
            </div>
          )}
          <textarea
            placeholder="Write a caption..."
            value={newPost.caption}
            onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
          />
          <button type="submit">Share Post</button>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="posts-feed">
        <h2>Feed</h2>
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to share!</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post">
              <div className="post-header">
                <strong>{post.username}</strong>
              </div>
              <img src={post.imageUrl} alt={post.caption} />
              <div className="post-actions">
                <button onClick={() => handleLike(post.id)}>
                  {post.likes.includes(currentUser) ? '❤️' : '🤍 Like'} ({post.likes.length})
                </button>
              </div>
              <div className="post-caption">
                <strong>{post.username}:</strong> {post.caption}
              </div>
              <div className="post-comments">
                <h4>Comments ({post.comments.length}):</h4>
                {post.comments.map(comment => (
                  <p key={comment.id}>{comment.text}</p>
                ))}
                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={post.newComment}
                    onChange={(e) => {
                      setPosts(posts.map(p => {
                        if (p.id === post.id) {
                          return { ...p, newComment: e.target.value };
                        }
                        return p;
                      }));
                    }}
                  />
                  <button onClick={() => handleAddComment(post.id)}>Post</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;