import React from "react";
// import { railsAssetImagePath } from "./";

const Message = ({ handle, message, icon }) => {
  return (
    <p>
      <strong> {handle}: </strong>
      {message}
    </p>
  );
};

export default Message;
