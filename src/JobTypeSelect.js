// @flow

import * as React from "react";

import Select from "./Select";

const jobTypes = [
  "...",
  "Festanstellung (Vollzeit)",
  "Festanstellung (Teilzeit)",
  "Freiberuflich",
  "Projektarbeit",
  "Praktikum",
  "Traineeship",
  "Aushilfstätigkeit",
  "Werkstudent (HiWi)",
  "Praxissemester",
  "Volontariat",
  "Selbstständigkeit",
  "Elternzeit",
  "Arbeitslosigkeit",
  "Wehrdienst",
  "Zivildienst",
];

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
    {jobTypes.map((jobType, index) => (
      <option key={index} value={jobType}>
        {jobType}
      </option>
    ))}
  </Select>
);
