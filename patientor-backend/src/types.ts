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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn?: string;
  entries: Entry[];
};

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;
