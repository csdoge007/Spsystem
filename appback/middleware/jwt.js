import jwt from 'jsonwebtoken';
import { secretKey } from "../config.js";
// 中间件函数，用于验证JWT Token
const authenticateToken = (req, res, next) => {
  // 从请求头中获取Token
  const token = req.headers.authorization;
  console.log('token', token);
  let decode;

  if (token) {
    try {
      decode = jwt.verify(token, secretKey);
      req.id = decode.id;
      next();
    } catch (err) {
        res.status(401).send({msg: 'token无效或已过期'});
        console.log(err);
        return;
    }
  } else {
    res.status(401).send({msg: 'token不存在'});
    return;
  }
};

export default authenticateToken;
