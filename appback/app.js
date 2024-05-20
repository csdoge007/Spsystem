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
  getThermalData,
  deletePoint,
  getNewLayers,
  getTotal,
  getCurrentItems,
  getEditData,
  updateLayerData,
  deleteNewLayer, 
  upload, } from './controller/map.js';
import authenticateToken from './middleware/jwt.js';
import { login, registerUser, getUserInfo, updateUserInfo, getUserName } from './controller/user.js';
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

app.delete('/deletePoint', authenticateToken, deletePoint);

app.get('/getNewLayers', authenticateToken, getNewLayers);

app.get('/getTotal', authenticateToken, getTotal);

app.get('/getCurrentItems', authenticateToken, getCurrentItems);

app.get('/getEditData', authenticateToken, getEditData);
app.post('/updateLayerData', authenticateToken, updateLayerData);
app.delete('/deleteNewLayer', authenticateToken, deleteNewLayer);

app.get('/getUserInfo', authenticateToken, getUserInfo);

app.put('/updateUserInfo',authenticateToken, updateUserInfo);
app.get('/getUserName', authenticateToken, getUserName);
app.post('/upload', authenticateToken, upload);
app.get('/api/user', (req, res) => {
  res.json({
    data: [
      {name: 'test'}
    ],
    code: 200
  })
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
