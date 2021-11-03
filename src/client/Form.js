import React, { useState } from 'react';

// New Post form
const Form = ({ onAdd }) => {
  // Store the input in state variables when the user types
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <form>
      <input
        placeholder={'Title'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder={'Content'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* When the user clicks the button, call the onAdd prop */}
      <button onClick={() => onAdd({ title, content })}>Post</button>
      <hr />
    </form>
  );
};

export default Form;
