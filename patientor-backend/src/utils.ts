import {
  NewPatientEntry,
  Gender,
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
} from './types';
import { Diagnosis } from './types';

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
    const objEntries: Entry[] = object.entries as Entry[];
    for (let i = 0; i < (objEntries as Entry[]).length; i++) {
      if (
        objEntries[i].type !== 'HealthCheck' &&
        objEntries[i].type !== 'Hospital' &&
        objEntries[i].type !== 'OccupationalHealthcare'
      ) {
        throw new Error('Incorrect or missing entry type');
      }
    }
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheck = (object: unknown): object is HospitalEntry => {
  if (!object || typeof object !== 'object') {
    return false;
  }

  if ('healthCheckRating' in object) {
    if (
      (object as HealthCheckEntry).healthCheckRating >= 0 &&
      (object as HealthCheckEntry).healthCheckRating <= 3 &&
      Number.isInteger(object.healthCheckRating)
    ) {
      return true;
    }
  }
  return false;
};

const isOccupationalCheck = (
  object: unknown
): object is OccupationalHealthcareEntry => {
  if (!object || typeof object !== 'object') {
    return false;
  }

  if ('employerName' in object) {
    if ('sickLeave' in object) {
      if (
        'startDate' in
          (object as { sickLeave: { startDate: unknown } }).sickLeave &&
        'endDate' in
          (object as { sickLeave: { endDate: unknown } }).sickLeave &&
        isDate(
          (object as { sickLeave: { startDate: unknown } }).sickLeave.startDate
        ) &&
        isDate(
          (object as { sickLeave: { endDate: unknown } }).sickLeave.endDate
        )
      ) {
        return true;
      } else return false;
    }

    return true;
  }

  return false;
};

const isHospital = (object: unknown): object is HospitalEntry => {
  if (!object || typeof object !== 'object') {
    return false;
  }

  if (
    'discharge' in object &&
    'date' in (object as HospitalEntry).discharge &&
    'criteria' in (object as HospitalEntry).discharge &&
    isDate((object as HospitalEntry).discharge.date)
  ) {
    return true;
  }

  return false;
};

const toEntryWithoutId = (object: unknown): Entry => {
  if (!object || typeof object !== 'object') {
    throw new Error(
      'Incorrect or missing object, make sure fields are correct'
    );
  }

  if (!('type' in object)) {
    throw new Error('Type is missing');
  }

  if ('diagnosisCodes' in object) {
    object.diagnosisCodes = parseDiagnosisCodes(object);
  }

  if (!('description' in object)) {
    throw new Error('Description is missing');
  }

  if (!('date' in object)) {
    throw new Error('Date is missing');
  }

  if (!('specialist' in object)) {
    throw new Error('Specialist is missing');
  }

  if (!isDate(object.date)) {
    throw new Error('Date is incorrect');
  }

  if ('id' in object) {
    throw new Error('Id should not be included');
  }

  switch (object.type) {
    case 'HealthCheck':
      if (!isHealthCheck(object)) {
        throw new Error(
          'HealthCheckRating is missing or has an invalid value. It should be a number between 0 and 3.'
        );
      }
      break;
    case 'Hospital':
      if (!isHospital(object)) {
        throw new Error(
          'Discharge property is missing (or some of its fields have incorrect values, like date).'
        );
      }
      break;
    case 'OccupationalHealthcare':
      if (!isOccupationalCheck(object)) {
        throw new Error(
          'EmployerName or sickLeave is missing, or dates were incorrect.'
        );
      }
      break;
    default:
      throw new Error('Type is incorrect');
  }

  return object as Entry;
};

export default {
  toNewPatientEntry,
  parseGender,
  parseDiagnosisCodes,
  toEntryWithoutId,
};
