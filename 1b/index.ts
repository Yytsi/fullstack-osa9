import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    // get height and width from url query
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      return res.status(400).send({ error: "malformatted parameters" });
    }
    res.send({
      height,
      weight,
      bmi: calculateBmi(height, weight)
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send({ error: "malformatted parameters" });
    }
  }
  return;
});

app.post('/exercises', (req, res) => {
  try {     
    const { daily_exercises, target } = req.body as { daily_exercises: number[], target: number };
    if (daily_exercises === undefined || target === undefined) {
      return res.status(400).json({ error: 'parameters missing' });
    }
     
    for (const v of [...daily_exercises, target]) {
      try {
        if (isNaN(Number(v)) || Number(v) < 0) {
          return res.status(400).json({ error: 'malformatted parameters' });
        }
      } catch {
        return res.status(400).json({ error: 'malformatted parameters' });
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: 'malformatted parameters' });
    }
  }
  return;
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});