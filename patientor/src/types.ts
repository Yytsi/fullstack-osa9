export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender | string;
  occupation: string;
  ssn?: string;
  entries: Entry[];
};

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

export type EntryPossibleValues = {
  type: string;
  description: string;
  date: string;
  specialist: string;
  healthCheckRating: number;
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
  discharge: {
    date: string;
    criteria: string;
  };
  diagnosisCodes: Array<Diagnosis['code']>;
};
