import { NewPatientEntry, Gender } from './types';

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
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(value);
};

const parseGender = (value: unknown): Gender => {
  if (!value || !isGender(value)) {
    throw new Error('Incorrect or missing gender');
  }

  return value;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing object');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'occupation' in object &&
    'gender' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newEntry;
  }

  throw new Error('Incorrect or missing object');
};

export default { toNewPatientEntry, parseGender };
