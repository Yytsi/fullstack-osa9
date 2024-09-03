import { z } from 'zod';

import { NewPatientEntry, Gender } from './types';

const toNewPatientEntrySchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(1),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1),
});

const toNewPatientEntry = (object: unknown): NewPatientEntry =>
  toNewPatientEntrySchema.parse(object);

export default { toNewPatientEntry, toNewPatientEntrySchema };
