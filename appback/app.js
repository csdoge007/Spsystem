import express from 'express';
import cors from './middleware/cors.js';
import bodyParser from 'body-parser';
import { 
  getPoi, 
  searchPoi, 
  boxSelectPoi, 
  getAccessibility, 
  addPoint, 
  getLayers, 
  addLayer, 
  updateView, 
  getScores, 
  deleteLayer } from './controller/map.js';
import authenticateToken from './middleware/jwt.js';
import { login } from './controller/user.js';
const app = express();

const port = 3000;



app.all('*', cors);

// app.use(expressJWT({
//   secret: secretKey,
// }));

app.use(bodyParser.json());

app.get('/', authenticateToken, getPoi);

app.get('/searchPoi', authenticateToken, searchPoi);

app.post('/boxSelectPoi', authenticateToken, boxSelectPoi);

app.post('/login', login);

app.get('/getAccessibility', authenticateToken, getAccessibility);

app.post('/addPoint', authenticateToken, addPoint);

app.get('/getLayers', authenticateToken, getLayers);

app.post('/addLayer', authenticateToken, addLayer);

app.post('/updateView', authenticateToken, updateView);

app.get('/getScores', authenticateToken, getScores);

app.delete('/deleteLayer', authenticateToken, deleteLayer);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
