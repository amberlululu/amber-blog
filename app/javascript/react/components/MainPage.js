import React, { Fragment } from "react";

const MainPage = (props) => {
  return (
    <Fragment>
      <div id="page-content">
        <div className="jumbotron jumbotron-fluid text-center">
          <div className="container">
            <h1 className="display-4">Fluid words</h1>
            <p className="lead">We are here waiting for your story!</p>
            <a className="btn btn-info btn-lg" href="#" role="button">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MainPage;
