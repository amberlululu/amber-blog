import React from "react";
import { Link } from "react-router-dom";

const ArticleTile = ({ id, key, title, description, user }) => {
  return (
    <div className="text-center container">
      <div className="row justify-content-md-center">
        <div className="col-8 mt-4">
          <div className="card text-center shadow mb-5 bg-white rounded">
            <div className="card-header font-italic">{user}</div>
            <div className="card-body">
              <h5>
                <Link
                  to={`/articles/${id}`}
                  className="card-title text-success"
                >
                  {title}
                </Link>
              </h5>
              <p className="card-text"></p>
            </div>
            <div className="card-footer text-muted">2 days ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleTile;
