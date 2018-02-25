// @flow

import * as React from "react";

import type { Data } from "./types";

type Props = {|
  data: Data,
  onEdit: () => void,
|};

export default (props: Props) => {
  const { data } = props;
  const { startMonth, startYear, ongoing } = data;
  let { endMonth, endYear } = data;

  let timeInterval;
  if (ongoing) {
    timeInterval = makeIntervalOngoing(startMonth, startYear);
  } else {
    timeInterval = makeInterval(startMonth, endMonth, startYear, endYear);
  }

  if (ongoing) {
    const date = new Date();
    endMonth = (date.getMonth() + 1).toString();
    endYear = date.getFullYear().toString();
  }
  let duration;
  if (
    (startMonth === "" && endMonth === "") ||
    (startMonth !== "" && endMonth !== "")
  ) {
    duration = makeDuration(startMonth, endMonth, startYear, endYear);
  }

  return (
    <div className="panel">
      <div className="row">
        <div className="col-4">
          {timeInterval !== "" && <p>{timeInterval}</p>}
          {duration !== "" && (
            <h5>
              <span className="badge badge-secondary">{duration}</span>
            </h5>
          )}
          <h5>
            <span className="badge badge-secondary">{data.jobType}</span>
          </h5>
        </div>

        <div className="col-8">
          <h4>{data.jobTitle}</h4>
          <p>
            {data.website ? (
              <a href={data.website}>{data.organization}</a>
            ) : (
              data.organization
            )}
            {data.city && " in " + data.city}
            {data.country && " (" + data.country + ")"}
          </p>
          {data.description && <p>{data.description}</p>}
          {data.salutation &&
            data.surname && (
              <div>
                Referenz:
                <br />
                {data.salutation}
                {data.title && " " + data.title}
                {data.name && " " + data.name}
                {" " + data.surname}
                {data.position && (
                  <span>
                    <br />
                    {data.position}
                  </span>
                )}
                {data.phone && (
                  <span>
                    <br />
                    {data.phone}
                  </span>
                )}
                {data.email && (
                  <span>
                    <br />
                    <a href={"mailto:" + data.email}>{data.email}</a>
                  </span>
                )}
              </div>
            )}
        </div>
      </div>

      <div className="row">
        <div className="col-12 text-right">
          <a className="btn btn-primary" onClick={props.onEdit}>
            Bearbeiten
          </a>
        </div>
      </div>
    </div>
  );
};

function makeIntervalOngoing(startMonth: string, startYear: string): string {
  const startDate = makeDate(startMonth, startYear);
  if (startDate == "") {
    return "";
  }

  return startDate + " bis heute";
}

function makeInterval(
  startMonth: string,
  endMonth: string,
  startYear: string,
  endYear: string
): string {
  const startDate = makeDate(startMonth, startYear);
  if (startDate == "") {
    return "";
  }

  const endDate = makeDate(endMonth, endYear);
  if (endDate == "") {
    return "";
  }

  return startDate === endDate ? startDate : startDate + " bis " + endDate;
}

function makeDate(month: string, year: string): string {
  if (year === "") {
    return "";
  }
  return month !== "" ? pad(month, 2) + "." + year : year;
}

function pad(s: string, width: number): string {
  if (s.length >= width) {
    return s;
  }
  return "0".repeat(width - s.length) + s;
}

function makeDuration(
  startMonth: string,
  endMonth: string,
  startYear: string,
  endYear: string
): string {
  let yearsDuration = parseInt(endYear) - parseInt(startYear);
  if (isNaN(yearsDuration)) {
    return "";
  }
  if (yearsDuration < 0) {
    return "";
  }

  let monthsDuration = parseInt(endMonth) - parseInt(startMonth);
  if (monthsDuration < 0) {
    yearsDuration -= 1;
    monthsDuration = 12 - -1 * monthsDuration;
  }

  let duration = "";
  if (yearsDuration > 0 && monthsDuration > 0) {
    duration =
      yearsDuration +
      makeSingleOrPlural(" Jahr", yearsDuration) +
      ", " +
      monthsDuration +
      makeSingleOrPlural(" Monat", monthsDuration);
  } else if (yearsDuration > 0) {
    duration = yearsDuration + makeSingleOrPlural(" Jahr", yearsDuration);
  } else if (monthsDuration > 0) {
    duration = monthsDuration + makeSingleOrPlural(" Monat", monthsDuration);
  }

  return duration;
}

function makeSingleOrPlural(word: string, n: number): string {
  if (n == 1) {
    return word;
  }
  return word + "e";
}
