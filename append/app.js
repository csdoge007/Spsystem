import express from 'express';
import cors from './middleware/cors.js';
import bodyParser from 'body-parser';
import { getPoi, searchPoi, boxSelectPoi } from './controller/map.js';
// import expressJWT from 'express-jwt';
// import { secretKey } from './config.js';
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
