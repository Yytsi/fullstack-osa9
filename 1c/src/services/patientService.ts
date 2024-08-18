import { Patient } from '../types';
import patients from '../data/patients';
import { v4 as uuid } from 'uuid';

const getPatientsWithoutSSN = (): Omit<Patient, 'ssn'>[] => {
  // return everything except the ssn field
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: Patient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
    ssn: patient.ssn || '',
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatientsWithoutSSN,
  addPatient,
};
