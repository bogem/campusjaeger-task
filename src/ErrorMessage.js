// @flow

import * as React from "react";

type Props = {|
  children?: React.Node,
|};

export default (props: Props) => {
  return props.children ? (
    <div className="error-message">{props.children}</div>
  ) : null;
};
