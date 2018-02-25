// @flow

import classnames from "classnames";
import * as React from "react";

type Props = {|
  children: React.Node,
  disabled?: boolean,
  forceInvalid?: boolean,
  id?: string,
  onChange?: (SyntheticEvent<HTMLSelectElement>) => void,
  value: string,
|};

type State = {|
  changed: boolean,
  focused: boolean,
|};

export default class Select extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { changed: false, focused: false };
  }

  handleBlur = () => this.setState({ focused: false });

  handleChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    this.props.onChange && this.props.onChange(event);
    this.setState({ changed: true });
  };

  handleFocus = () => this.setState({ focused: true });

  render(): React.Node {
    const valid = this.props.value !== "";

    const className = classnames({
      "form-control": true,
      invalid:
        this.props.forceInvalid ||
        (this.state.changed && (valid != null && !valid)),
      valid: this.state.changed && this.state.focused && valid,
    });

    return (
      <select
        className={className}
        disabled={this.props.disabled}
        id={this.props.id}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        value={this.props.value}
      >
        {this.props.children}
      </select>
    );
  }
}
