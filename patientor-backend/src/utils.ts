import { NewPatientEntry, Gender, Entry } from './types';

const isString = (value: unknown): value is string =>
  typeof value === 'string' || value instanceof String;

const isName = (value: unknown): value is string => {
  return isString(value);
};

const parseName = (value: unknown): string => {
  if (!value || !isName(value)) {
    throw new Error('Incorrect or missing name: ' + value);
  }

  return value;
};

const isDate = (value: unknown): boolean => {
  if (!value || !isString(value)) {
    return false;
  }
  return Boolean(Date.parse(value));
};

const parseDate = (value: unknown): string => {
  if (!value || !isString(value) || !isDate(value)) {
    throw new Error('Incorrect or missing date: ' + value);
  }

  return value;
};

const isOccupation = (value: unknown): value is string => {
  return isString(value);
};

const parseOccupation = (value: unknown): string => {
  if (!value || !isOccupation(value)) {
    throw new Error('Incorrect or missing occupation: ' + value);
  }

  return value;
};

const isSsn = (value: unknown): value is string => {
  return isString(value);
};

const parseSsn = (value: unknown): string => {
  if (!value || !isSsn(value)) {
    throw new Error('Incorrect or missing ssn: ' + value);
  }

  return value;
};

const isGender = (value: unknown): value is Gender => {
  if (!value || !isString(value)) {
    return false;
  }
  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(capitalizedValue as string);
};

const parseGender = (value: unknown): Gender => {
  if (!value || !isGender(value)) {
    throw new Error('Incorrect or missing gender');
  }

  return value;
};

const parseEntries = (value: unknown): Entry[] => {
  if (!value) {
    throw new Error('Incorrect or missing entries');
  }

  return value as Entry[];
};

const toNewPatientEntry = (
  object: unknown,
  fromUserInput: boolean
): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing object');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'occupation' in object &&
    'gender' in object &&
    'entries' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: fromUserInput
        ? parseGender(object.gender)
        : (object.gender as Gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error('Incorrect or missing object');
};

export default { toNewPatientEntry, parseGender };
