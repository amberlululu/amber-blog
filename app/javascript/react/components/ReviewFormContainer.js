import React, { useState } from "react";

const ReviewFormContainer = (props) => {
  const [review, setReview] = useState({
    rating: "",
    body: "",
  });

  const [errors, setErrors] = useState("");

  let errorMessage = <p></p>;
  if (errors !== "") {
    errorMessage = <p>{errors}</p>;
  }

  const handleInputChange = (event) => {
    setReview({
      ...review,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const onSubmitHandeler = (event) => {
    event.preventDefault();
    addNewReview(review);
  };

  const clearForm = () => {
    setReview({
      rating: "",
      body: "",
    });
  };

  const addNewReview = (review) => {
    fetch(`/api/v1/articles/${props.articleId}/reviews`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
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
        if (body.error) {
          if (body.error[0] === "You need to be signed in first") {
            setErrors("Please sign in to make reviews");
          }
        } else {
          if (body.review) {
            props.addReview(body.review);
            clearForm();
          } else if (body.errors[0] === "Rating is not a number") {
            setErrors("Rating is not a number");
          } else if (body.errors[0] === "Rating can't be blank") {
            setErrors("Rating can't be blank");
          } else if (
            body.errors[0] === "Rating must be less than or equal to 5"
          ) {
            setErrors("Rating must be less than or equal to 5");
          } else if (
            body.errors[0] === "Rating must be greater than or equal to 1"
          ) {
            setErrors("Rating must be greater than or equal to 1");
          } else if (body.errors[0] === "Body can't be blank") {
            setErrors("Body can't be blank");
          } else if (
            body.errors[0] === "Body is too short (minimum is 10 characters)"
          ) {
            setErrors("Body is too short (minimum is 10 characters)");
          }
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  return (
    <div className="container">
      <form className="form-color" onSubmit={onSubmitHandeler}>
        {errorMessage}
        <h1>New Review Form</h1>
        <div className="form-group container">
          <label htmlFor="rating">Rating:</label>
          <input
            className="form-control"
            type="integer"
            id="rating"
            name="rating"
            onChange={handleInputChange}
            value={review.rating}
            placeholder="1-5"
          ></input>
        </div>

        <div className="form-group container">
          <label htmlFor="body">Body:</label>
          <textarea
            className="form-control"
            rows="3"
            type="text"
            id="body"
            name="body"
            onChange={handleInputChange}
            value={review.body}
          />
        </div>

        <div className="form-group row justify-content-center">
          <input
            className="btn btn-outline-light btn-lg"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewFormContainer;
