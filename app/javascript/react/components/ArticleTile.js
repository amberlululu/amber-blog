import React from "react";
import { Link } from "react-router-dom";

const ArticleTile = ({ id, user, title, description }) => {
  return (
    <div>
      <h1>
        {user.username}
        <Link to={`/articles/${id}`}> {title} </Link>
      </h1>
    </div>
  );
};

export default ArticleTile;
