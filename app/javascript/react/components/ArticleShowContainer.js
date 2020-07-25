import React, { useEffect, useState } from "react";
import Article from "./Article";

const ArticleShowContainer = (props) => {
  const [articleRecord, setArticleRecord] = useState({
    id: null,
    title: "",
    description: "",
  });

  let articleId = props.match.params.id;

  useEffect(() => {
    fetch(`/api/v1/articles/${articleId}`, {
      credentials: "same-origin",
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        setArticleRecord(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  return (
    <div>
      <Article
        key={articleRecord.id}
        id={articleRecord.id}
        user={articleRecord.user_id}
        title={articleRecord.title}
        description={articleRecord.description}
      />
    </div>
  );
};

export default ArticleShowContainer;
