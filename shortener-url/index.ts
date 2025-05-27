import bodyParser from 'body-parser';
import express from 'express';
import * as index from './src/index.controllers'
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(bodyParser.json());

app.post('/register', index.register)
app.get('/:short', index.resolve);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
