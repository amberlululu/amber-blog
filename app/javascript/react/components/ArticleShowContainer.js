import React, { useEffect, useState } from "react";
import Article from "./Article";
import ReviewFormContainer from "./ReviewFormContainer";

const ArticleShowContainer = (props) => {
  const [articleRecord, setArticleRecord] = useState({});

  const [reviews, setReviews] = useState([]);

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
        setArticleRecord(body.article);
        setReviews(body.article.reviews);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div>
      <Article
        key={articleRecord.id}
        id={articleRecord.id}
        title={articleRecord.title}
        description={articleRecord.description}
        article_creater={articleRecord.article_creater}
        reviews={reviews}
      />
      <ReviewFormContainer articleId={articleId} addReview={addReview} />
    </div>
  );
};

export default ArticleShowContainer;
