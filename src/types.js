// @flow

type Data = {|
  startMonth: string,
  endMonth: string,
  startYear: string,
  endYear: string,
  ongoing: boolean,
  jobTitle: string,
  jobType: string,
  organization: string,
  website: string,
  city: string,
  country: string,
  description: string,
  salutation: string,
  title: string,
  name: string,
  surname: string,
  position: string,
  phone: string,
  email: string,
|};

const initialData = {
  startMonth: "",
  endMonth: "",
  startYear: "",
  endYear: "",
  ongoing: false,
  jobTitle: "",
  jobType: "",
  organization: "",
  website: "",
  city: "",
  country: "",
  description: "",
  salutation: "",
  title: "",
  name: "",
  surname: "",
  position: "",
  phone: "",
  email: "",
};

type Errors = {
  startMonth?: string,
  startYear?: string,
  endYear?: string,
  jobTitle?: string,
  jobType?: string,
  organization?: string,
  website?: string,
  salutation?: string,
  phone?: string,
  email?: string,

  // Workaround for exact type. Works as expected
  // when dealing with objects that can be empty.
  //
  // eslint-disable-next-line flowtype/no-weak-types
  [any]: empty,
};

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type Option = { value: string, label: string };

// assign is Object.assign with type checking.
// See https://github.com/facebook/flow/issues/2405.
// Thanks @lloiser for solution.
function assign<T>(a: T, ...b: $Shape<T>[]): T {
  return Object.assign({}, a, ...b);
}

export type { Data, Errors, FormElement, Option };
export { assign, initialData };
