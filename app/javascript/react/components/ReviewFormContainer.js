import React, { useState } from "react";
import ErrorList from "./ErrorList";
import _ from "lodash";

const ReviewFormContainer = (props) => {
  const [reviewRecord, setReviewRecord] = useState([
    {
      rating: null,
      body: "",
      article_id: null,
    },
  ]);

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    setReviewRecord({
      ...reviewRecord,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const validForSubmission = () => {
    let submitErrors = {};
    const requiredFields = ["rating", "body"];
    requiredFields.forEach((field) => {
      if (reviewRecord[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "must be filled in",
        };
      }
    });
    setErrors(submitErrors);
    return _.isEmpty(submitErrors);
  };

  const onSubmitHandeler = (event) => {
    event.preventDefault();
    if (validForSubmission()) {
      addNewReview(reviewRecord);
    }
  };

  let articleId = props.articleId;
  const addNewReview = (reviewRecord) => {
    fetch(`/api/v1/articles/${articleId}/reviews`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewRecord),
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
        if (body) {
          setReviewRecord(body);
          window.location.reload();
          // setReviewRecord([...reviewRecord, body]);
          // } else if ((body.error[0] = "you need to be signed in first")) {
          //   // debugger;
          //   history.go("/users/sign_in");
          // } else if (body.errors) {
          //   // debugger;
          //   setErrors(body.errors);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  return (
    <form className="callout secondary" onSubmit={onSubmitHandeler}>
      <ErrorList errors={errors} />
      <h1>New Review Form</h1>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="integer"
          id="rating"
          name="rating"
          onChange={handleInputChange}
          value={reviewRecord.rating}
        />
      </div>

      <div>
        <label htmlFor="body">Body:</label>
        <input
          type="text"
          id="body"
          name="body"
          onChange={handleInputChange}
          value={reviewRecord.body}
        />
      </div>

      <div className="button-group">
        <input type="submit" className="button" value="Submit " />
      </div>
    </form>
  );
};

export default ReviewFormContainer;
