import React from "react";
import Post from "./Post";
import Form from "./Form";
import "./App.css";
import useNotes from "./hooks/useNotes";
const API = `/.netlify/functions`;

// State for loading, error and notes
const App = () => {
  const { notes, loading, error, client } = useNotes(API);

  // If error or loading, show a message
  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  // Otherwise, show the Form and a list of Notes
  return (
    <div className="App">
      <header>SimpleNotes</header>
      <Form
        onAdd={({ title, content }) => client.addPost({ title, content })}
      />
      <div>
        {notes.map((note) => (
          <Post
            data={note}
            onDelete={() => client.deletePost({ id: note.id })}
          />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default App;
