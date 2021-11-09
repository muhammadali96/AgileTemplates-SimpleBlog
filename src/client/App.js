import React from "react";
import Note from "./Note";
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
        onAdd={({ title, content }) => client.addNote({ title, content })}
      />
      <div>
        {notes.map((note) => (
          <Note
            data={note}
            onDelete={() => client.deleteNote({ id: note.id })}
          />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default App;
