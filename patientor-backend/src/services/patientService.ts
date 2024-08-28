import {
  Patient,
  NonSensitivePatient,
  NewPatientEntry,
  Entry,
  EntryWithoutId,
} from '../types';
import patients from '../data/patients';
import utils from '../utils';
import { v4 as uuid } from 'uuid';

const getPatientsWithoutSSN = (): NonSensitivePatient[] => {
  // return everything except the ssn field
  try {
    return patients.map(
      ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender: gender,
        occupation,
        entries,
      })
    );
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Error in parsing the data: ' + e.message);
    }
    throw new Error('Unknown error');
  }
};

const getPatient = (id: string): NewPatientEntry | undefined => {
  const patient = utils.toNewPatientEntry(
    patients.find((p) => p.id === id),
    false
  );
  return patient;
};

const addPatient = (patient: Patient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
    ssn: patient.ssn || '',
    entries: patient.entries || [],
  };
  patients.push({
    ...newPatient,
    gender: newPatient.gender,
  });
  return newPatient;
};

const addEntry = (entry: EntryWithoutId, id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error('Patient not found');
  }

  for (let patient of patients) {
    if (patient.id === id) {
      const newEntry: Entry = {
        id: uuid(),
        ...entry,
      };
      patient.entries.push(newEntry);
      return patient;
    }
  }
  return undefined;
};

export default {
  getPatientsWithoutSSN,
  addPatient,
  getPatient,
  addEntry,
};
