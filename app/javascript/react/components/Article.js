import React from "react";

const Article = ({ id, user, title, description }) => {
  return (
    <div>
      <h1>{user.username}</h1>
      <h2>{title}</h2>
      <div>{description}</div>
    </div>
  );
};

export default Article;
