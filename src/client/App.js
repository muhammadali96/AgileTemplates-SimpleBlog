import React, { useEffect, useState } from 'react';
import Post from './Post';
import Form from './Form';
import './App.css';
const API = `/.netlify/functions`;

// State for loading, error and posts
const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  // When the component renders for the first time, fetch all the posts
  useEffect(() => {
    getPosts();
  }, []);
  async function getPosts() {
    try {
      setLoading(true);
      const response = await fetch(`${API}/get-posts`);
      const { posts, error } = await response.json();
      if (error) throw new Error(error);
      setPosts(posts);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  // Add or delete posts
  async function addPost({ title, content }) {
    try {
      if (!title || !content) return;
      setLoading(true);
      const body = JSON.stringify({ title, content });
      await fetch(`${API}/add-post`, { method: 'POST', body });
      return getPosts(); // Refresh all posts
    } catch (error) {
      setError(error);
    }
  }
  async function deletePost({ id }) {
    try {
      setLoading(true);
      const body = JSON.stringify({ id });
      await fetch(`${API}/delete-post`, { method: 'POST', body });
      return getPosts(); // Refresh all posts
    } catch (error) {
      setError(error);
    }
  }

  // If error or loading, show a message
  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  // Otherwise, show the Form and a list of Posts
  return (
    <div className="App">
      <header>SimpleBlog</header>
      <Form onAdd={({ title, content }) => addPost({ title, content })} />
      <div>
        {posts.map((post) => (
          <Post data={post} onDelete={() => deletePost({ id: post.id })} />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default App;
