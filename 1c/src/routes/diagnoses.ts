import express from 'express';

import diagnosisService from '../services/diagnosisService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.send(diagnosisService.getEntries());
  console.log('called diagnosis, hello from here!');
});

export default diagnosesRouter;
