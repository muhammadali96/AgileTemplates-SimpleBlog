import React from 'react';
import TimeAgo from 'react-timeago';

// A single blog post
const Post = ({ data, onDelete }) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <hr />
      <div>
        <h3>{data.title}</h3>

        {/* Timeago is a cool library that lets us show relative dates 
        (https://www.npmjs.com/package/react-timeago) */}
        <TimeAgo date={data.date} />

        <p>{data.content}</p>
      </div>
      <button onClick={onDelete}>delete</button>
    </div>
  );
};

export default Post;
