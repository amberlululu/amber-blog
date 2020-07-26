import React from "react";
import { Link } from "react-router-dom";

const Article = ({ id, user, title, description }) => {
  return (
    <div key={id}>
      <h3>Author: {user}</h3>
      <h3>Article Name: {title}</h3>
      <h4>Description:</h4>
      <h4>{description}</h4>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Article;
