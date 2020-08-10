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

  const updateReviews = (updatedReview) => {
    setReviews(updatedReview);
  };

  return (
    <div>
      <Article
        key={articleRecord.id}
        id={articleRecord.id}
        title={articleRecord.title}
        description={articleRecord.description}
        image={articleRecord.image}
        article_creater={articleRecord.article_creater}
        updateReviews={updateReviews}
        admin={articleRecord.admin_user}
        reviews={reviews}
        articleId={articleId}
      />
      <ReviewFormContainer articleId={articleId} addReview={addReview} />
    </div>
  );
};

export default ArticleShowContainer;
