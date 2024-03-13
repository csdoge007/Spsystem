import express from 'express';
import cors from './middleware/cors.js';
import bodyParser from 'body-parser';
import { getPoi, searchPoi, boxSelectPoi } from './controller/map.js';
const app = express();

const port = 3000;



app.all('*', cors);

app.use(bodyParser.json());

app.get('/', getPoi);

app.get('/searchPoi',searchPoi);

app.post('/boxSelectPoi', boxSelectPoi);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
