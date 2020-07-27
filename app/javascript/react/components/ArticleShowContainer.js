import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Article from "./Article";
import ReviewFormContainer from "./ReviewFormContainer";

const ArticleShowContainer = (props) => {
  const [articleRecord, setArticleRecord] = useState({
    id: null,
    title: "",
    description: "",
  });

  const [reviewRecord, setReviewRecord] = useState([
    {
      id: null,
      rating: null,
      body: "",
      article_id: null,
    },
  ]);

  const [redirect, shouldRedirect] = useState(false);

  let articleId = props.match.params.id;

  useEffect(() => {
    fetch(`/api/v1/articles/${articleId}`, {
      credentials: "same-origin",
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
        setArticleRecord(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const removeArticle = () => {
    let id = props.match.params.id;
    fetch(`/api/v1/articles/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      shouldRedirect(true);
    });
  };

  if (redirect) {
    return <Redirect to="/articles" />;
  }

  const confirmDelete = () => {
    let confirmMessage = confirm("Do you want to delete this item?");
    if (confirmMessage === true) {
      removeArticle();
    }
  };

  let deleteButton;
  // if (currentUser) {
  //   if (currentUser.role === "member") {
  //     deleteButton = (
  //       <button className="button" onClick={confirmDelete}>
  //         Delete
  //       </button>
  //     );
  //   } else {
  //     deleteButton = "";
  //   }
  // }

  deleteButton = (
    <button className="button" onClick={confirmDelete}>
      Delete
    </button>
  );

  useEffect(() => {
    fetch(`/api/v1/articles/${articleId}/reviews`, {
      credentials: "same-origin",
    })
      .then((response) => {
        if (response.ok) {
          // debugger;
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
        setReviewRecord(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  return (
    <div>
      <Article
        key={articleRecord.id}
        id={articleRecord.id}
        user={articleRecord.user_id}
        title={articleRecord.title}
        description={articleRecord.description}
        reviews={reviewRecord}
      />
      {deleteButton}
      <ReviewFormContainer articleId={articleId} />
    </div>
  );
};

export default ArticleShowContainer;
