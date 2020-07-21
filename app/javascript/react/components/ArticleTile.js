import React from "react";
import { Link } from "react-router-dom";

const ArticleTile = ({ id, title, description }) => {
  return (
    <div>
      <h1>
        <Link to={`/articles/${id}`}> {title} </Link>
      </h1>
    </div>
  );
};

export default ArticleTile;
