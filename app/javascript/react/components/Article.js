import React from "react";
import Review from "./Review";

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

  let userProfileLink = <div></div>;
  if (current_user_id) {
    userProfileLink = (
      <div className="text-center">
        <a href={`/users/${current_user_id}`}>User Profile</a>
      </div>
    );
  }

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
      {userProfileLink}
    </div>
  );
};

export default Article;
