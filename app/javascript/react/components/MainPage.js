import React, { Fragment } from "react";

const MainPage = (props) => {
  return (
    <Fragment>
      <div id="page-content">
        <div className="jumbotron jumbotron-fluid text-center">
          <div className="container">
            <h1 className="display-4">Food Paradise</h1>
            <p className="lead">We are here waiting for your story!</p>
            <a
              className="btn btn-info btn-lg"
              href="/users/sign_up"
              role="button"
            >
              Sign Up
            </a>
          </div>
        </div>
        <div className="card-group">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1538301258798-f3fdb8bbc3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=998&q=80"
              className="card-img-top1"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Eat Healthy</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1566454419290-57a64afe30ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 classname="card-title">Sweets</h5>
              <p className="card-text">
                This card has supporting text below as a natural lead-in to
                additional content.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1557473235-6cfa0d95515f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
              class="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Relax</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MainPage;
