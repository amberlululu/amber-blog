import React, { useState, useEffect } from "react";
import ArticleTile from "./ArticleTile";
import { Link } from "react-router-dom";

const ArticlesIndexContainer = (props) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/v1/articles")
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        setArticles(body.articles);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  let articletiles = articles.map((article) => {
    return (
      <ArticleTile
        id={article.id}
        key={article.id}
        title={article.title}
        description={article.description}
      />
    );
  });

  return (
    <div>
      <h1 className="text-center">Listing all Articles</h1>
      <h3>{articletiles}</h3>
      <Link to="/articles/new">Create New Article</Link>
    </div>
  );
};

export default ArticlesIndexContainer;
