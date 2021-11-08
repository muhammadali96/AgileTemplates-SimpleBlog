import { useEffect, useState } from "react";

const useNotes = (API) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState([]);

  // When the component renders for the first time, fetch all the notes
  useEffect(() => {
    getNotes();
  }, []);
  async function getNotes() {
    try {
      setLoading(true);
      const response = await fetch(`${API}/get-notes`);
      const { notes, error } = await response.json();
      if (error) throw new Error(error);
      setNotes(notes);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  // Add or delete notes
  async function addPost({ title, content }) {
    try {
      if (!title || !content) return;
      setLoading(true);
      const body = JSON.stringify({ title, content });
      await fetch(`${API}/add-note`, { method: "POST", body });
      return getNotes(); // Refresh all notes
    } catch (error) {
      setError(error);
    }
  }
  async function deletePost({ id }) {
    try {
      setLoading(true);
      const body = JSON.stringify({ id });
      await fetch(`${API}/delete-note`, { method: "POST", body });
      return getNotes(); // Refresh all notes
    } catch (error) {
      setError(error);
    }
  }
  const client = { addPost, deletePost };
  return { notes, loading, error, client };
};

export default useNotes;
