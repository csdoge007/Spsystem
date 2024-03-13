import pool from "../config.js";
import { secretKey } from "../config.js";
import jwt from 'jsonwebtoken';
import { getUserByAccount } from "../service/user.js";
export async function login (req, res) {
  try {
    const pool_client = await pool.connect();
    const { account, password } = req.body.userInfo;
    console.log(account, password);
    const userInfo = await getUserByAccount(account);
    if(!userInfo || !userInfo.id) {
      res.status(500).send({
        msg: '账号不存在',
        data: null,
      });
      return;
    }

    if(userInfo && password !== userInfo.password) {
      res.status(500).send({
        msg: '账号密码错误',
        data: null,
      });
      return;
    }

    const token = jwt.sign(
      {
        id: userInfo._id,
        account: userInfo.account,
      },
      secretKey,
      {
        expiresIn: Math.floor(Date.now() / 1000) + (24 * 60 *60),
      }
    )

    res.status(200).send({
      msg: '登录成功',
      data: token,
    })


  } catch (err) {
    console.error(err);
    res.send("Error" + err);
  }
};



