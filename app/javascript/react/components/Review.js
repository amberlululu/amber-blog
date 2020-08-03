import React from "react";

const Review = ({
  id,
  key,
  rating,
  body,
  user,
  updateReviews,
  admin,
  articleId,
}) => {
  const deleteReview = (event) => {
    fetch(`/api/v1/articles/${articleId}/reviews/${id}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
        if (body.reviews) {
          updateReviews(body.reviews);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  let deleteButton = <></>;
  if (admin) {
    deleteButton = (
      <div className="btn btn-outline-info" onClick={deleteReview}>
        Delete
      </div>
    );
  }

  let ratingStar;

  switch (rating) {
    case 1:
      ratingStar = "★☆☆☆☆";
      break;
    case 2:
      ratingStar = "★★☆☆☆";
      break;
    case 3:
      ratingStar = "★★★☆☆";
      break;
    case 4:
      ratingStar = "★★★★☆";
      break;
    case 5:
      ratingStar = "★★★★★";
      break;
  }
  return (
    <div key={id}>
      <p>
        <span>{user}</span> {ratingStar}
      </p>
      <p>{body}</p>
      {deleteButton}
    </div>
  );
};

export default Review;
