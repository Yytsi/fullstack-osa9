import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';
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

export default {
  getPatientsWithoutSSN,
  addPatient,
  getPatient,
};
