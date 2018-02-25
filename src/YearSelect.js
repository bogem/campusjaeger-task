// @flow

import * as React from "react";

import Select from "./Select";

type Props = {|
  disabled?: boolean,
  forceInvalid?: boolean,
  id?: string,
  onChange?: (SyntheticEvent<HTMLSelectElement>) => void,
  value: string,
|};

export default (props: Props) => {
  const startYear = 2033;
  const endYear = 1953;

  return (
    <div className="form-group">
      <Select
        disabled={props.disabled}
        forceInvalid={props.forceInvalid}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
      >
        <option key="0" value="">
          ...
        </option>
        {range(startYear, endYear).map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
    </div>
  );
};

function range(from: number, to: number): number[] {
  if (from === to) {
    return [from];
  }

  const incrementor = to > from ? 1 : -1;
  let a = new Array(Math.abs(to - from) + 1);

  for (var i = from; i != to; i += incrementor) {
    a.push(i);
  }
  a.push(to);

  return a;
}
