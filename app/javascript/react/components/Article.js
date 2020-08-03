import React from "react";
import Review from "./Review";

const Article = ({
  id,
  key,
  title,
  description,
  reviews,
  article_creater,
  updateReviews,
  admin,
  articleId,
}) => {
  const articleReviews = reviews.map((review) => {
    return (
      <div key={review.id}>
        <Review
          id={review.id}
          rating={review.rating}
          body={review.body}
          user={review.commenter_name}
          updateReviews={updateReviews}
          admin={admin}
          articleId={articleId}
        />
      </div>
    );
  });

  return (
    <div key={key}>
      <div className="container">
        <h3>{title}</h3>
        <p>
          <em>{description}</em>
        </p>
        <h3>Reviews</h3>
        {articleReviews}
      </div>
    </div>
  );
};

export default Article;
