import React from "react";

const Review = ({ id, key, rating, body, user }) => {
  return (
    <div key={key}>
      <p>User: {user}</p>
      <p>Rating: {rating}</p>
      <p>Body: {body}</p>
    </div>
  );
};

export default Review;
