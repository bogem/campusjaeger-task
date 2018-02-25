// @flow

import classnames from "classnames";
import * as React from "react";

type Props = {|
  forceInvalid?: boolean,
  id?: string,
  onChange: (SyntheticEvent<HTMLInputElement>) => void,
  validate?: string => boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  value: any,
|};

type State = {|
  focused?: boolean,
  typing?: boolean,
|};

export default class TextInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      focused: undefined,
      typing: undefined,
    };
  }

  handleBlur = () => this.setState({ focused: false, typing: false });

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.props.onChange(event);
    this.setState({ typing: true });
  };

  handleFocus = () => this.setState({ focused: true });

  render(): React.Node {
    const { forceInvalid, validate, value } = this.props;
    const { focused, typing } = this.state;
    const valid = validate && validate(value);

    const className = classnames({
      "form-control": true,

      // Use 'invalid' style when:
      // 1. User is typing an invalid value;
      // 2. User typed invalid value and unfocused from input;
      // 3. Prop 'forceInvalid' is set.
      invalid: forceInvalid || (typing != null && valid != null && !valid),

      // Use 'valid' style only when user is typing a valid value.
      valid: typing && focused && valid,
    });

    return (
      <input
        className={className}
        id={this.props.id}
        maxLength="256"
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        type="text"
        value={this.props.value}
      />
    );
  }
}
