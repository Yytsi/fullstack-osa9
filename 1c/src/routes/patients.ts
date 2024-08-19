import express from 'express';

import patientService from '../services/patientService';

import { Patient } from '../types';

import utils from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  console.log('fetching all patients');
  res.send(patientService.getPatientsWithoutSSN());
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = utils.toNewPatientEntry(req.body);
    const newPatient: Patient = {
      id: '',
      name: newPatientEntry.name,
      dateOfBirth: newPatientEntry.dateOfBirth,
      gender: newPatientEntry.gender,
      occupation: newPatientEntry.occupation,
      ssn: newPatientEntry.ssn,
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
