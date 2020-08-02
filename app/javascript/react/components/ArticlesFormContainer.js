import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ErrorList from "./ErrorList";
import _ from "lodash";

const ArticlesFormContainer = (props) => {
  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleInputChange = (event) => {
    setNewArticle({
      ...newArticle,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const validForSubmission = () => {
    let submitErrors = {};
    const requiredFields = ["title", "description"];
    requiredFields.forEach((field) => {
      if (newArticle[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank",
        };
      }
    });
    setErrors(submitErrors);
    return _.isEmpty(submitErrors);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (validForSubmission()) {
      addNewArticle(newArticle);
    }
  };

  const addNewArticle = (article) => {
    fetch(`/api/v1/articles`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
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
        if (body.article) {
          setShouldRedirect(true);
        } else if ((body.error[0] = "you need to be signed in first")) {
          props.history.go("/users/sign_in");
        } else if (body.error) {
          setErrors(body.error.description[0]);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  if (shouldRedirect) {
    return <Redirect to="/articles" />;
  }

  return (
    <form className="" onSubmit={onSubmitHandler}>
      <ErrorList errors={errors} />
      <h1> New Article Form</h1>

      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleInputChange}
          value={newArticle.title}
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          id="description"
          name="description"
          onChange={handleInputChange}
          value={newArticle.description}
        />
      </div>

      <div className="button-group">
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default ArticlesFormContainer;
