export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  male = 0,
  female = 1,
  other = 2,
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn?: string;
};

export type NewPatientEntry = Omit<Patient, 'id'>;
