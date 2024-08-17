import express from 'express';
import diagnosesRouter from './routes/diagnoses';
const app = express();
app.use(express.json());

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('called ping, hello from here!');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
