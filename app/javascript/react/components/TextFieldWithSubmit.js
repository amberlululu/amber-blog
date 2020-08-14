import React from "react";

const TextFieldWithSubmit = (props) => {
  return (
    <div className="input-group ">
      <input
        className="input-group-field"
        id="enter-bar"
        name={props.name}
        onChange={props.handlerFunction}
        type="text"
        value={props.content}
      />
      <div className="input-group-button" id="chat-button">
        <input type="submit" className="btn btn-info" value="Submit" />
      </div>
    </div>
  );
};

export default TextFieldWithSubmit;
