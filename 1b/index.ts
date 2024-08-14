import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

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
      throw new Error('malformatted parameters');
    }
    res.send({
      height,
      weight,
      bmi: calculateBmi(height, weight)
    });
  } catch (e) {
    if (e instanceof Error) {
      res.send({ error: "malformatted parameters" });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});