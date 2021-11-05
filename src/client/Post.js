import React from "react";
import TimeAgo from "react-timeago";
import Filter from "bad-words";

// A single blog post
const Post = ({ data, onDelete, censorBadWords }) => {
  let filter = new Filter();
  return (
    <div style={{ marginBottom: 24 }}>
      <hr />
      <div>
        {censorBadWords ? (
          <h3>{filter.clean(data.title)}</h3>
        ) : (
          <h3>{data.title}</h3>
        )}

        {/* Timeago is a cool library that lets us show relative dates 
        (https://www.npmjs.com/package/react-timeago) */}
        <TimeAgo date={data.date} />
        {censorBadWords ? (
          <p>{filter.clean(data.content)}</p>
        ) : (
          <p>{data.content}</p>
        )}
      </div>
      <button onClick={onDelete}>delete</button>
    </div>
  );
};

export default Post;
