import React from "react";

const Message = ({ username, message }) => {
  return (
    <p>
      <strong> {username}: </strong>
      {message}
    </p>
  );
};

export default Message;
