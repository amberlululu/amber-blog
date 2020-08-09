import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ErrorList from "./ErrorList";
import _ from "lodash";

const ArticlesFormContainer = (props) => {
  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    image: "",
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
    <div className="container">
      <div id="page-content" onSubmit={onSubmitHandler}>
        <h1 className="text-center mt-4"> New Article Form</h1>

        <div className="row justify-content-center">
          <div className="col-10">
            <ErrorList errors={errors} />
            <form className=" shadow p-3 mb-3 bg-info rounded">
              <div className="form-group row">
                <label htmlFor="title" className="col-2 col-form-label">
                  Title:
                </label>
                <div className="col-10">
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleInputChange}
                    value={newArticle.title}
                    placeholder="Title of the Article"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="description" className="col-2 col-form-label">
                  Description:
                </label>
                <div className="col-10">
                  <textarea
                    className="form-control"
                    rows="10"
                    type="text"
                    id="description"
                    name="description"
                    onChange={handleInputChange}
                    value={newArticle.description}
                    placeholder="Description of the Article"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="image" className="col-2 col-form-label">
                  Image:
                </label>
                <div className="col-10">
                  <input
                    className="form-control"
                    type="text"
                    id="image"
                    name="image"
                    size="100"
                    onChange={handleInputChange}
                    value={newArticle.image}
                    placeholder="Image of the Article"
                  />
                </div>
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
        </div>
      </div>
    </div>
  );
};

export default ArticlesFormContainer;
