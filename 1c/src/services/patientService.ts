import { Patient } from '../types';
import patients from '../data/patients';

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

export default {
  getPatientsWithoutSSN,
};
