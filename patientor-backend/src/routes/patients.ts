import express from 'express';

import patientService from '../services/patientService';

import { EntryWithoutId, Patient } from '../types';

import utils from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getPatientsWithoutSSN());
});

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.post('/:id/entries', (req, res) => {
  try {
    const entryObject: EntryWithoutId = utils.toEntryWithoutId(req.body);

    const modifiedEntry: Patient | undefined = patientService.addEntry(
      entryObject,
      req.params.id
    );

    if (!modifiedEntry) {
      res.status(404).send('Patient not found');
    }

    res.json(modifiedEntry);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      res.status(400).send('Unknown error');
    }
  }
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = utils.toNewPatientEntry(req.body, true);
    const newPatient: Patient = {
      id: '',
      name: newPatientEntry.name,
      dateOfBirth: newPatientEntry.dateOfBirth,
      gender: newPatientEntry.gender,
      occupation: newPatientEntry.occupation,
      ssn: newPatientEntry.ssn,
      entries: newPatientEntry.entries,
    };
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      res.status(400).send('Unknown error');
    }
  }
});

export default patientRouter;
