// @flow

import * as ReactDOM from "react-dom";
import * as React from "react";

import EditPanel from "./EditPanel";
import Preview from "./Preview";
import type { Data } from "./types";
import { initialData } from "./types";

type State = {|
  creatingNewProject: boolean,
  data: Data,
  editingExistingProject: boolean,
  projectIsCreated: boolean,
|};

class App extends React.Component<{}, State> {
  constructor() {
    super();
    this.state = {
      creatingNewProject: false,
      data: initialData,
      editingExistingProject: false,
      projectIsCreated: false,
    };
  }

  handleCancel = () => {
    this.setState({
      creatingNewProject: false,
      editingExistingProject: false,
    });
  };

  handleDelete = () => {
    this.setState({
      creatingNewProject: false,
      data: initialData,
      editingExistingProject: false,
      projectIsCreated: false,
    });
  };

  handleEdit = () => {
    this.setState({
      editingExistingProject: true,
    });
  };

  handleNew = () => {
    this.setState({
      creatingNewProject: true,
    });
  };

  handleSave = (data: Data) => {
    this.setState({
      creatingNewProject: false,
      data,
      editingExistingProject: false,
      projectIsCreated: true,
    });
  };

  render(): React.Node {
    if (this.state.creatingNewProject) {
      return (
        <EditPanel
          data={this.state.data}
          new={true}
          onCancel={this.handleCancel}
          onDelete={this.handleDelete}
          onSave={this.handleSave}
        />
      );
    } else if (this.state.editingExistingProject) {
      return (
        <EditPanel
          data={this.state.data}
          new={false}
          onCancel={this.handleCancel}
          onDelete={this.handleDelete}
          onSave={this.handleSave}
        />
      );
    } else if (this.state.projectIsCreated) {
      return <Preview data={this.state.data} onEdit={this.handleEdit} />;
    } else {
      return <AddButton onClick={this.handleNew} />;
    }
  }
}

type AddButtonProps = {| onClick: () => void |};
const AddButton = ({ onClick }: AddButtonProps) => (
  <a className="btn btn-primary" onClick={onClick}>
    + Praxiserfahrung hinzufügen
  </a>
);

const el = document.getElementById("root");
if (el) {
  ReactDOM.render(<App />, el);
}
