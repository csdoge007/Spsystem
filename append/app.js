import express from 'express';
import cors from './middleware/cors.js';
import { getPoi } from './service/get.js';
const app = express();

const port = 3000;



app.all('*', cors);


app.get('/', getPoi);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
