import { Patient } from '../types';
import patients from '../data/patients';
import utils from '../utils';
import { v4 as uuid } from 'uuid';

const getPatientsWithoutSSN = (): Omit<Patient, 'ssn'>[] => {
  // return everything except the ssn field
  try {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender: utils.toNewPatientEntrySchema.shape.gender.parse(gender),
      occupation,
    }));
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Error in parsing the data: ' + e.message);
    }
    throw new Error('Unknown error');
  }
};

const addPatient = (patient: Patient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
    ssn: patient.ssn || '',
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
};
