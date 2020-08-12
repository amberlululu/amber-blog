import React from "react";
// import { railsAssetImagePath } from "../../react/constants/railsAssetImagePath";

const Message = ({ username, message }) => {
  return (
    <p>
      <strong> {username}: </strong>
      {message}
    </p>
  );
};

export default Message;
