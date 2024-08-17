import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const rootApiRouter = express.Router();

rootApiRouter.get('/ping', (_req, res) => {
  console.log('called ping, hello from here!');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);
app.use('/api', rootApiRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
