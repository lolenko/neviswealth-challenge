import express from 'express';
import cors from 'cors';
import data from './data.json' with { type: 'json' };

const app = express();
const port = 4000;

app.use(cors());

app.get('/analytics', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
