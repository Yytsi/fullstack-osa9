type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn?: string;
};

export { Diagnosis, Patient };
