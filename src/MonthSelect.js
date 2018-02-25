// @flow

import * as React from "react";

import Select from "./Select";

const months = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

type Props = {|
  forceInvalid?: boolean,
  disabled?: boolean,
  id?: string,
  onChange?: (SyntheticEvent<HTMLSelectElement>) => void,
  value: string,
|};

export default (props: Props) => (
  <div className="form-group">
    <Select
      forceInvalid={props.forceInvalid}
      disabled={props.disabled}
      id={props.id}
      onChange={props.onChange}
      value={props.value}
    >
      <option key={0} value="">
        ...
      </option>
      {months.map((month: string, index: number): React.Node => (
        <option key={index} value={index + 1}>
          {month}
        </option>
      ))}
    </Select>
  </div>
);
