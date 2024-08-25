import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';
import patients from '../data/patients';
import utils from '../utils';
import { v4 as uuid } from 'uuid';

const getPatientsWithoutSSN = (): NonSensitivePatient[] => {
  // return everything except the ssn field
  try {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender: utils.parseGender(gender),
      occupation,
    }));
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Error in parsing the data: ' + e.message);
    }
    throw new Error('Unknown error');
  }
};

const getPatient = (id: string): NewPatientEntry | undefined => {
  const patient = utils.toNewPatientEntry(patients.find((p) => p.id === id));
  return patient;
};

const addPatient = (patient: Patient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
    ssn: patient.ssn || '',
    entries: [],
  };
  patients.push({
    ...newPatient,
    gender: patient.gender.toString(),
  });
  return newPatient;
};

export default {
  getPatientsWithoutSSN,
  addPatient,
  getPatient,
};
