import React from "react";
import { Link } from "react-router-dom";

const ArticleTile = ({ id, title, description }) => {
  return (
    <div key={key}>
      <h3>
        <Link to={`/articles/${id}`}> {title} </Link>
      </h3>
    </div>
  );
};

export default ArticleTile;
