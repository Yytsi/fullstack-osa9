import express from 'express';

import patientService from '../services/patientService';

import { Patient } from '../types';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  console.log('fetching all patients');
  res.send(patientService.getPatientsWithoutSSN());
});

patientRouter.post('/', (req, res) => {
  // take from body

  // empty object
  const newPatient: Patient = {
    id: '',
    name: '',
    dateOfBirth: '',
    ssn: '',
    gender: '',
    occupation: '',
  };

  try {
    // name
    if (!req.body.name) {
      res.status(400).send('Name is missing');
      throw new Error('Name is missing');
    }
    const name = req.body.name;

    if (!req.body.dateOfBirth) {
      res.status(400).send('Date of birth is missing');
      throw new Error('Date of birth is missing');
    }
    const dateOfBirth = req.body.dateOfBirth;

    if (req.body.ssn) {
      newPatient.ssn = req.body.ssn;
    }

    if (!req.body.occupation) {
      res.status(400).send('Occupation is missing');
      throw new Error('Occupation is missing');
    }

    const occupation = req.body.occupation;

    if (req.body.gender) {
      newPatient.gender = req.body.gender;
    }

    newPatient.name = name;
    newPatient.dateOfBirth = dateOfBirth;
    newPatient.occupation = occupation;
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
      console.log(e.message);
    }
  }

  console.log('adding a patient');
  res.send(patientService.addPatient(newPatient));
});

export default patientRouter;
