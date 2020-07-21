import React from "react";

const Article = ({ id, title, description }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{description}</div>
    </div>
  );
};

export default Article;
