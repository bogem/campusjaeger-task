// @flow

import * as React from "react";

import Select from "./Select";

type Props = {|
  forceInvalid?: boolean,
  id?: string,
  onChange?: (SyntheticEvent<HTMLSelectElement>) => void,
  value: string,
|};

export default (props: Props) => (
  <Select
    forceInvalid={props.forceInvalid}
    id={props.id}
    onChange={props.onChange}
    value={props.value}
  >
    <option value="">...</option>
    <option value="Herr">Herr</option>
    <option value="Frau">Frau</option>
  </Select>
);
