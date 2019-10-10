import React from "react";
const initialState = {
  question: "",
  type: "",
  options: [],
  instructions: "",
  showOptions: false
};

class Add extends React.Component {
  state = { ...initialState };

  setFieldType = e => {
    this.setState({ type: e.target.value });
  };

  renderOptions() {
    return (
      <div className="field">
        <label>Options (separated by a comma)</label>
        <input
          type="text"
          value={this.state.options.join()}
          onChange={e => this.setState({ options: e.target.value.split(",") })}
        />
      </div>
    );
  }

  handleAdd = () => {
    this.props.handleAdd({
      id: this.props.nextId,
      question: this.state.question,
      type: this.state.type,
      instructions: this.state.instructions,
      options: this.state.options
    });

    this.setState(initialState);
  };

  render() {
    if (!this.props.show) return null;
    return (
      <div
        className="ui form"
        style={{
          padding: "10px",
          margin: "10px",
          border: "1px solid gray"
        }}
      >
        <h4 className="ui dividing header">Add Field</h4>
        <div className="two fields">
          <div className="field">
            <label>Question</label>
            <input
              type="text"
              value={this.state.question}
              onChange={e =>
                this.setState({
                  question: e.target.value
                })
              }
            />
          </div>
          <div className="field">
            <label>Field Type</label>
            <select
              className="ui fluid dropdown"
              onChange={this.setFieldType}
              value={this.state.type}
            >
              <option value=""></option>
              <option value="text">Text</option>
              <option value="date">Date</option>
              <option value="radio">Radio Buttons</option>
              <option value="checkbox">Check Box</option>
              <option value="select">Dropdown (single select)</option>
              <option value="checkboxes">Check Boxes (multiple select)</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label>Instructions</label>
          <input
            type="text"
            value={this.state.instructions}
            onChange={e => this.setState({ instructions: e.target.value })}
          ></input>
        </div>
        {["radio", "checkboxes", "select"].includes(this.state.type)
          ? this.renderOptions()
          : null}
        <button className="ui positive button" onClick={this.handleAdd}>
          Add
        </button>
        <button className="ui button" onClick={this.props.handleCancel}>
          Cancel
        </button>
      </div>
    );
  }
}

export default Add;
