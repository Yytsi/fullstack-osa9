import express from 'express';

import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  console.log('fetching all patients');
  res.send(patientService.getPatientsWithoutSSN());
});

export default patientRouter;
