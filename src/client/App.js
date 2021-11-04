import React, { useEffect, useState } from "react";
import Post from "./Post";
import Form from "./Form";
import "./App.css";
import usePosts from "./hooks/usePosts";
const API = `/.netlify/functions`;

// State for loading, error and posts
const App = () => {
  const { posts, loading, error, client } = usePosts(API);

  // If error or loading, show a message
  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  // Otherwise, show the Form and a list of Posts
  return (
    <div className="App">
      <header>SimpleBlog</header>
      <Form
        onAdd={({ title, content }) => client.addPost({ title, content })}
      />
      <div>
        {posts.map((post) => (
          <Post
            data={post}
            onDelete={() => client.deletePost({ id: post.id })}
          />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default App;
