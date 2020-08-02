import React from "react";
import _ from "lodash";

const ErrorList = (props) => {
  const errantFields = Object.keys(props.errors);
  if (errantFields.length > 0) {
    let index = 0;
    const listItems = errantFields.map((field) => {
      index++;
      return (
        <li key={index}>
          {_.startCase(field)} {props.errors[field]}
        </li>
      );
    });
    return (
      <div className="alert alert-danger" role="alert">
        <h6 className="alert-heading">
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          The following errors prevented the article from being saved
        </h6>

        <ul>{listItems}</ul>
      </div>
    );
  } else {
    return "";
  }
};

export default ErrorList;
