import React from "react";
import { Link } from "react-router-dom";
import Review from "./Review";

const Article = ({
  id,
  key,
  user,
  title,
  description,
  reviews,
  article_creater,
}) => {
  const articleReviews = reviews.map((review) => {
    debugger;
    return (
      <Review
        key={review.id}
        id={review.id}
        rating={review.rating}
        body={review.body}
        user={review.commenter_name}
      />
    );
  });

  return (
    <div key={key}>
      <div>
        <h3>Author: {article_creater}</h3>
        <h3>Article Name: {title}</h3>
        <h4>Description:</h4>
        <h4>{description}</h4>
        <h3>Reviews</h3>
        {articleReviews}
      </div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Article;
