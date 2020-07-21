import React, { useEffect, useState } from "react";
import Article from "./Article";
const ArticleShowContainer = (props) => {
  const [articleRecord, setArticleRecord] = useState({
    id: null,
    title: "",
    description: "",
  });

  useEffect(() => {
    let articleId = props.match.params.id;
    fetch(`/api/v1/articles/${articleId}`)
      .then((response) => response.json())
      .then((articleJson) => {
        setArticleRecord(articleJson);
      });
  }, []);

  return (
    <div>
      <Article
        key={articleRecord.id}
        id={articleRecord.id}
        user={articleRecord.user}
        title={articleRecord.title}
        description={articleRecord.description}
      />
    </div>
  );
};

export default ArticleShowContainer;
