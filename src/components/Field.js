import React from "react";
const renderField = field => {
  switch (field.type) {
    case "text":
      return (
        <div className="ui fluid input">
          <input type="text" />
        </div>
      );
    case "date":
      return (
        <div className="ui fluid input">
          <input type="date" />
          {field.instructions !== "" ? <p>{field.instructions}</p> : ""}
        </div>
      );
    case "radio":
      return field.options.map(option => {
        return (
          <div key={option} className="field">
            <div className="ui radio checkbox">
              <input type="radio" name={field.question.trim()} value={option} />
              <label>{option}</label>
            </div>
          </div>
        );
      });
    case "checkbox":
      return (
        <div className="ui checkbox">
          <label></label>
          <input type="checkbox" />
        </div>
      );

    case "select":
      return (
        <select className="ui dropdown">
          {field.options.map(option => {
            return <option key={option}>{option}</option>;
          })}
        </select>
      );
    case "checkboxes":
      return field.options.map(option => {
        return (
          <div key={option} className="field">
            <div className="ui checkbox">
              <input type="checkbox" />
              <label>{option}</label>
            </div>
          </div>
        );
      });
    default:
      return <div>Field type not in the list!</div>;
  }
};

const Field = props => {
  return (
    <div style={{ padding: "5px 0" }}>
      <div className="ui message">
        <i
          className="red window close icon"
          onClick={() => props.handleDelete(props.field)}
        ></i>
        <div className="header">{props.field.question}</div>
        {props.field.instructions !== "" ? (
          <p>{props.field.instructions}</p>
        ) : (
          ""
        )}
        {renderField(props.field)}
      </div>
    </div>
  );
};

export default Field;
