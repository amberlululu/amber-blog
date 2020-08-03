import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const ArticleTile = ({
  id,
  title,
  description,
  user,
  created_at,
  article_creater,
}) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState("");

  let errorMessage;
  if (errors !== "") {
    errorMessage = (
      <div className="alert alert-danger container" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h6>{errors}</h6>
      </div>
    );
  }

  const removeArticle = () => {
    fetch(`/api/v1/articles/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
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
        // debugger;
        if (body.redirect) {
          setShouldRedirect(true);
        } else if (body.error) {
          setErrors("Only admins have access to this feature");
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  if (shouldRedirect) {
    return <Redirect to="/" />;
  }

  const confirmDelete = () => {
    let confirmMessage = confirm("Do you want to delete this item?");
    if (confirmMessage === true) {
      removeArticle();
    }
  };

  return (
    <div>
      {errorMessage}
      <div className="text-center container">
        <div className="row justify-content-md-center">
          <div className="col-8 mt-4">
            <div className="card text-center shadow mb-5 bg-white rounded">
              <div className="card-header font-italic">{article_creater}</div>
              <div className="card-body">
                <h5>
                  <Link
                    to={`/articles/${id}`}
                    className="card-title text-success"
                  >
                    {title}
                  </Link>
                </h5>
                <Link
                  to={`/articles/${id}`}
                  className="btn btn-outline-success mr-2"
                >
                  View
                </Link>
                <Link to="/" className="btn btn-outline-info mr-2">
                  Edit
                </Link>
                <button
                  className="btn btn-outline-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <p className="card-text"></p>
              </div>
              <div className="card-footer text-muted">
                <h6>Created at {created_at}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleTile;
