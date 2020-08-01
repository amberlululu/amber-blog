import React, { useEffect, useState } from "react";
import Article from "./Article";
import ReviewFormContainer from "./ReviewFormContainer";

const ArticleShowContainer = (props) => {
  const [articleRecord, setArticleRecord] = useState({});

  const [reviews, setReviews] = useState([]);

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
        setArticleRecord(body.article);
        setReviews(body.article.reviews);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  // const removeArticle = () => {
  //   let id = props.match.params.id;
  //   fetch(`/api/v1/articles/${id}`, {
  //     method: "DELETE",
  //     credentials: "same-origin",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   }).then(() => {
  //     shouldRedirect(true);
  //   });
  // };

  // if (redirect) {
  //   return <Redirect to="/articles" />;
  // }

  // const confirmDelete = () => {
  //   let confirmMessage = confirm("Do you want to delete this item?");
  //   if (confirmMessage === true) {
  //     removeArticle();
  //   }
  // };

  // let deleteButton;
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

  // deleteButton = (
  //   <button className="button" onClick={confirmDelete}>
  //     Delete
  //   </button>
  // );

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div>
      <Article
        key={articleRecord.id}
        id={articleRecord.id}
        title={articleRecord.title}
        description={articleRecord.description}
        reviews={reviews}
      />
      <ReviewFormContainer articleId={articleId} addReview={addReview} />
    </div>
  );
};

export default ArticleShowContainer;
