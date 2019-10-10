import React from "react";
import Add from "./Add";
import Field from "./Field";

class App extends React.Component {
  state = {
    name: "",
    fields: [],
    nextId: 0,
    showAdd: false,
    sent: false
  };

  toggleAdd = () => {
    this.setState({
      showAdd: !this.state.showAdd
    });
  };

  addField = field => {
    const new_fields = this.state.fields;
    new_fields.push(field);
    this.setState({ fields: new_fields });
    this.setState({ nextId: this.state.fields.length });
    this.setState({ showAdd: false });
  };

  deleteField = field => {
    const new_fields = this.state.fields.reduce((acc, item) => {
      if (item.question !== field.question) {
        acc.push(item);
      }

      return acc;
    }, []);

    this.setState({ fields: new_fields });
  };

  handleSubmit = async () => {
    const form = {
      formId: this.uuidv4(),
      name: this.state.name,
      fields: this.state.fields
    };

    try {
      const response = await fetch(process.env.REACT_APP_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (response.ok) this.setState({ sent: true });
    } catch (error) {
      alert("Submit not implemented in this version!");
    }
  };

  uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  render() {
    if (this.state.sent) {
      return (
        <div className="ui container">
          <h2 style={{ textAlign: "center" }}>Form Sent</h2>
        </div>
      );
    }
    return (
      <div>
        <div className="ui container">
          <h1>Form Builder</h1>
          <div className="ui form">
            <div className="field"></div>
            <label>Form Name</label>
            <input
              type="text"
              placeholder="Enter form name"
              onChange={e => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
          </div>
          {this.state.fields.map(field => {
            return (
              <span key={field.id}>
                <Field field={field} handleDelete={this.deleteField} />{" "}
              </span>
            );
          })}
          <Add
            show={this.state.showAdd}
            handleAdd={this.addField}
            handleDelete={this.deleteField}
            handleCancel={this.toggleAdd}
            nextId={this.state.nextId}
          />
          <br />
          <div
            className="ui field"
            style={{ display: this.state.showAdd ? "none" : "block" }}
          >
            <button
              className="ui button"
              type="button"
              onClick={e => this.toggleAdd()}
              style={{ float: "left" }}
            >
              Add Field
            </button>
            <button
              className="ui primary button"
              style={{ float: "right" }}
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
