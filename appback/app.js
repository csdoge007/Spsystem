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
  deleteLayer,
  reLayerName,
  getThermalData } from './controller/map.js';
import authenticateToken from './middleware/jwt.js';
import { login, registerUser } from './controller/user.js';
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

app.put('/reLayerName', authenticateToken, reLayerName);

app.post('/registerUser', registerUser);

app.post('/getThermalData', authenticateToken, getThermalData);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
