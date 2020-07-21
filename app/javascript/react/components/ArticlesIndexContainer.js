import React, { useState, useEffect } from "react";
import ArticleTile from "./ArticleTile";
const ArticlesIndexContainer = (props) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/v1/articles.json")
      .then((response) => response.json())
      .then((articleBody) => {
        setArticles(articleBody);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  let articletiles = articles.map((article) => {
    return (
      <ArticleTile
        id={article.id}
        key={article.id}
        user={article.user}
        title={article.title}
        description={article.description}
      />
    );
  });

  return (
    <div>
      <h3> Articles Index Container </h3>
      {articletiles}
    </div>
  );
};

export default ArticlesIndexContainer;
