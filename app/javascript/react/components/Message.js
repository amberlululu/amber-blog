import React from "react";
// import { railsAssetImagePath } from "./";

const Message = ({ username, message }) => {
  // debugger;
  return (
    <p>
      <strong> {username}</strong>
      {message}
    </p>
  );
};

export default Message;
