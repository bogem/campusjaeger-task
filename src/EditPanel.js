// @flow

import type { SelectOption } from "react-select";
import scrollToComponent from "react-scroll-to-component";
import * as React from "react";
import isEmail from "validator/lib/isEmail";
import isURL from "validator/lib/isURL";

import ErrorMessage from "./ErrorMessage";
import CountrySelect from "./CountrySelect";
import JobTypeSelect from "./JobTypeSelect";
import MonthSelect from "./MonthSelect";
import OrganizationSelect from "./OrganizationSelect";
import SalutationSelect from "./SalutationSelect";
import TextInput from "./TextInput";
import type { Data, Errors, FormElement } from "./types";
import { assign } from "./types";
import YearSelect from "./YearSelect";

type Props = {|
  data: Data,
  new: boolean,
  onCancel: () => void,
  onDelete: () => void,
  onSave: Data => void,
|};

type State = {|
  data: Data,
  errors: Errors,
|};

export default class EditPanel extends React.Component<Props, State> {
  el: ?HTMLDivElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      data: props.data,
      errors: {},
    };
  }

  handleChange = (event: SyntheticEvent<FormElement>) => {
    const target = (event.currentTarget: FormElement);
    this.setDataValue(target.id, target.value);
  };

  handleCheckboxChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = (event.currentTarget: HTMLInputElement);
    this.setDataValue(target.id, target.checked);
  };

  handleOrganizationChange = (option: SelectOption) => {
    option && this.setDataValue("organization", option.value);
  };

  handlePhoneChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = (event.currentTarget: HTMLInputElement);
    const { id, value } = target;
    if (!value || value.length === 0) {
      this.setDataValue(id, value);
    }

    if (isMobilePhone(value)) {
      this.setDataValue(id, value);
    } else {
      this.setDataValue(id, value.slice(0, -1));
    }
  };

  handleSave = () => {
    this.setState(function(prevState: State): $Shape<State> {
      const { data } = prevState;
      const errors = this.checkErrors(data);

      if (Object.getOwnPropertyNames(errors).length > 0) {
        this.el && scrollToComponent(this.el, { align: "top", offset: -50 });
        return { errors };
      } else {
        this.props.onSave(prevState.data);
        return {};
      }
    });
  };

  checkErrors(data: Data): Errors {
    let errors = {};

    const startMonth = parseInt(data.startMonth);
    const startYear = parseInt(data.startYear);

    let endMonth, endYear;
    if (data.ongoing) {
      const date = new Date();
      endMonth = date.getMonth() + 1;
      endYear = date.getFullYear();
    } else {
      endMonth = parseInt(data.endMonth);
      endYear = parseInt(data.startYear);
    }

    if (startYear > endYear) {
      errors.startYear =
        "Das Anfangsdatum darf nicht hinter dem Enddatum liegen.";
    }
    if (startYear === endYear && startMonth > endMonth) {
      errors.startMonth =
        "Das Anfangsmonat darf nicht hinter dem Endmonat liegen.";
    }
    if (data.startYear === "") {
      errors.startYear =
        "Bitte wähle das Jahr aus, in dem du mit der Tätigkeit begonnen hast.";
    }
    if (data.endYear === "" && !data.ongoing) {
      errors.endYear =
        "Bitte wähle das Jahr aus, in dem deine Tätigkeit endete bzw. voraussichtlich endet.";
    }
    if (data.jobTitle === "") {
      errors.jobTitle = "Bitte gib einen Jobtitel an.";
    }
    if (data.jobType === "") {
      errors.jobType = "Bitte wähle eine Beschäftigungsart aus.";
    }
    if (data.organization === "") {
      errors.organization = "Bitte wähle eine Option aus.";
    }
    if (data.website !== "" && !isURL(data.website)) {
      errors.website = "Bitte gib eine gültige URL ein.";
    }
    if (data.surname !== "" && data.salutation === "") {
      errors.salutation = "Bitte fülle die Referenz vollständig aus.";
    }
    if (data.phone !== "" && !isMobilePhone(data.phone)) {
      errors.phone = "Bitte gib ein gültiges Telefone ein.";
    }
    if (data.email !== "" && !isEmail(data.email)) {
      errors.email = "Bitte gib eine E-Mail-Adresse im richtigen Format an.";
    }

    return errors;
  }

  setDataValue = (key: string, value: mixed) => {
    this.setState((prevState: State): State => ({
      data: assign(prevState.data, { [key]: value }),
      errors: assign(prevState.errors, { [key]: undefined }),
    }));
  };

  render(): React.Node {
    return (
      <div className="container panel" ref={el => (this.el = el)}>
        {this.props.new ? (
          <h2>Praxiserfahrung hinzufügen</h2>
        ) : (
          <h2>Praxiserfahrung bearbeiten</h2>
        )}

        <br />

        <div className="row">
          <div className="col-6">
            <label htmlFor="startMonth">Von (Monat)</label>
            <MonthSelect
              forceInvalid={!!this.state.errors.startMonth}
              id="startMonth"
              onChange={this.handleChange}
              value={this.state.data.startMonth}
            />
            <ErrorMessage>{this.state.errors.startMonth}</ErrorMessage>
          </div>

          <div className="col-6">
            <label htmlFor="startYear">Von (Jahr) *</label>
            <YearSelect
              forceInvalid={!!this.state.errors.startYear}
              id="startYear"
              onChange={this.handleChange}
              value={this.state.data.startYear}
            />
            <ErrorMessage>{this.state.errors.startYear}</ErrorMessage>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label htmlFor="endMonth">Bis (Monat)</label>
            <MonthSelect
              disabled={this.state.data.ongoing}
              id="endMonth"
              onChange={this.handleChange}
              value={this.state.data.endMonth}
            />
          </div>

          <div className="col-6">
            <label htmlFor="endYear">Bis (Jahr) *</label>
            <YearSelect
              forceInvalid={!!this.state.errors.endYear}
              disabled={this.state.data.ongoing}
              id="endYear"
              onChange={this.handleChange}
              value={this.state.data.endYear}
            />
            <ErrorMessage>{this.state.errors.endYear}</ErrorMessage>
          </div>
        </div>

        <OngoingCheckbox
          onChange={this.handleCheckboxChange}
          value={this.state.data.ongoing}
        />

        <br />

        <div className="row">
          <div className="form-group col-6">
            <label htmlFor="jobTitle">Jobbezeichnung *</label>
            <TextInput
              forceInvalid={!!this.state.errors.jobTitle}
              id="jobTitle"
              onChange={this.handleChange}
              value={this.state.data.jobTitle}
            />
            <ErrorMessage>{this.state.errors.jobTitle}</ErrorMessage>
          </div>

          <div className="form-group col-6">
            <label htmlFor="jobType">Beschäftigungsart *</label>
            <JobTypeSelect
              forceInvalid={!!this.state.errors.jobType}
              id="jobType"
              onChange={this.handleChange}
              value={this.state.data.jobType}
            />
            <ErrorMessage>{this.state.errors.jobType}</ErrorMessage>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-6">
            <label htmlFor="organization">Unternehmen *</label>
            <OrganizationSelect
              forceInvalid={!!this.state.errors.organization}
              id="organization"
              onChange={this.handleOrganizationChange}
              value={this.state.data.organization}
            />
            <ErrorMessage>{this.state.errors.organization}</ErrorMessage>
          </div>

          <div className="form-group col-6">
            <label htmlFor="website">Website</label>
            <TextInput
              forceInvalid={this.state.errors.website}
              id="website"
              onChange={this.handleChange}
              validate={isURL}
              value={this.state.data.website}
            />
            <ErrorMessage>{this.state.errors.website}</ErrorMessage>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-6">
            <label htmlFor="city">Ort</label>
            <TextInput
              id="city"
              onChange={this.handleChange}
              value={this.state.data.city}
            />
          </div>

          <div className="form-group col-6">
            <label htmlFor="country">Land</label>
            <CountrySelect
              id="country"
              onChange={this.handleChange}
              value={this.state.data.country}
            />
          </div>
        </div>

        <DescriptionTextArea
          onChange={this.handleChange}
          value={this.state.data.description}
        />

        <label>Referenz</label>

        <div className="row">
          <div className="form-group col-6">
            <label htmlFor="salutation">Anrede</label>
            <SalutationSelect
              forceInvalid={!!this.state.errors.salutation}
              id="salutation"
              onChange={this.handleChange}
              value={this.state.data.salutation}
            />
            <ErrorMessage>{this.state.errors.salutation}</ErrorMessage>
          </div>

          <div className="form-group col-6">
            <label htmlFor="title">Titel</label>
            <TextInput
              id="title"
              onChange={this.handleChange}
              value={this.state.data.title}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-6">
            <label htmlFor="name">Vorname</label>
            <TextInput
              id="name"
              onChange={this.handleChange}
              value={this.state.data.name}
            />
          </div>

          <div className="form-group col-6">
            <label htmlFor="surname">Nachname</label>
            <TextInput
              id="surname"
              onChange={this.handleChange}
              value={this.state.data.surname}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-6">
            <label htmlFor="position">Position</label>
            <TextInput
              id="position"
              onChange={this.handleChange}
              value={this.state.data.position}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-6">
            <label htmlFor="phone">Telefonnummer</label>
            <TextInput
              forceInvalid={this.state.errors.phone}
              id="phone"
              onChange={this.handlePhoneChange}
              validate={isMobilePhone}
              value={this.state.data.phone}
            />
            <ErrorMessage>{this.state.errors.phone}</ErrorMessage>
          </div>

          <div className="form-group col-6">
            <label htmlFor="email">E-Mail-Adresse</label>
            <TextInput
              forceInvalid={this.state.errors.email}
              id="email"
              onChange={this.handleChange}
              validate={isEmail}
              value={this.state.data.email}
            />
            <ErrorMessage>{this.state.errors.email}</ErrorMessage>
          </div>
        </div>

        <SaveButton onClick={this.handleSave} />
        <div className="row justify-content-center">
          <CancelButton onClick={this.props.onCancel} />
          {!this.props.new && <DeleteButton onClick={this.props.onDelete} />}
        </div>
      </div>
    );
  }
}

type OngoingCheckboxProps = {|
  onChange: (SyntheticEvent<HTMLInputElement>) => void,
  value: boolean,
|};
const OngoingCheckbox = ({ onChange, value }: OngoingCheckboxProps) => (
  <div className="form-check">
    <input
      className="form-check-input"
      id="ongoing"
      onChange={onChange}
      type="checkbox"
      value={value}
    />
    <label className="form-check-label" htmlFor="ongoing">
      Bis heute andauernd
    </label>
  </div>
);

type DescriptionTextAreaProps = {|
  onChange: (SyntheticEvent<HTMLTextAreaElement>) => void,
  value: string,
|};
const DescriptionTextArea = ({ onChange, value }: DescriptionTextAreaProps) => (
  <div className="form-group">
    <label htmlFor="description">Beschreibung</label>
    <textarea
      className="form-control col-12"
      cols="30"
      id="description"
      onChange={onChange}
      rows="10"
      value={value}
    />
  </div>
);

type ButtonProps = {| onClick: () => void |};

const SaveButton = ({ onClick }: ButtonProps) => (
  <a className="btn btn-danger col-12" onClick={onClick}>
    SPEICHERN
  </a>
);

const CancelButton = ({ onClick }: ButtonProps) => (
  <a className="btn btn-info col-3 cancel-button" onClick={onClick}>
    ABBRECHEN
  </a>
);

const DeleteButton = ({ onClick }: ButtonProps) => (
  <a className="btn btn-info col-3 delete-button" onClick={onClick}>
    LÖSCHEN
  </a>
);

const isMobilePhone = (value: string): boolean => {
  if (!value || value.length === 0) {
    return false;
  }

  const lastChar = value.slice(-1);
  const isFirstChar = value.length === 1;
  if (
    (lastChar === "+" && isFirstChar) ||
    lastChar == " " ||
    !isNaN(parseInt(lastChar))
  ) {
    return true;
  }
  return false;
};
