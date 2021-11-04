import { useEffect, useState } from "react";

const usePosts = (API) => {
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
      await fetch(`${API}/add-post`, { method: "POST", body });
      return getPosts(); // Refresh all posts
    } catch (error) {
      setError(error);
    }
  }
  async function deletePost({ id }) {
    try {
      setLoading(true);
      const body = JSON.stringify({ id });
      await fetch(`${API}/delete-post`, { method: "POST", body });
      return getPosts(); // Refresh all posts
    } catch (error) {
      setError(error);
    }
  }
  const client = { addPost, deletePost };
  return { posts, loading, error, client };
};

export default usePosts;
