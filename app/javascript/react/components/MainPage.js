import React from "react";
import { Link } from "react-router-dom";

const MainPage = (props) => {
  return (
    <div>
      <h3>Welcome to AmberBlog</h3>
      <Link to="/articles">See Articles</Link>
    </div>
  );
};

export default MainPage;
