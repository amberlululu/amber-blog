import React from "react";
import Review from "./Review";
import { Link } from "react-router-dom";

const Article = ({
  id,
  title,
  description,
  image,
  reviews,
  article_creater,
  current_user_id,
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
    <div key={id}>
      <div className="container">
        <h3>{title}</h3>
        <p>
          <em>{description}</em>
        </p>
        <img src={image} alt="item image" />
        <h3>Reviews</h3>
        {articleReviews}
      </div>
      <Link to={`/users/${current_user_id}`}>
        <p className="text-center text-black">Your Profile</p>
      </Link>
    </div>
  );
};

export default Article;
