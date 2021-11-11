import React from "react";
import Post from "./Post";
export default function Posts({ onDelete, posts }) {
  return (
    <div>
      {posts.map((post) => (
        <Post
          data={post}
          key={post.id}
          onDelete={() => onDelete({ id: post.id })}
        />
      ))}
    </div>
  );
}
