import React from "react";

const Review = ({ id, rating, body }) => {
  return (
    <div key={id}>
      <p>Rating: {rating}</p>
      <p>Body: {body}</p>
    </div>
  );
};

export default Review;
