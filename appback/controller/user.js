import pool from "../config.js";
import { secretKey } from "../config.js";
import jwt from 'jsonwebtoken';
import { getUserByAccount, verifyCpr, verifyOnlyAcc, verifyOnlyUser, addUser, searchCorporation, searchUser, updateUser, searchUserName } from "../service/user.js";
export async function login (req, res, next) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const { account, password } = req.body.userInfo;
    console.log(account, password);
    const userInfo = await getUserByAccount(account);
    console.log(userInfo);
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
      console.log('密码错误');
      return;
    }
    console.log('密码正确');
    const token = jwt.sign(
      {
        id: userInfo.id,
        account: userInfo.account,
        corporation: userInfo.corporation,
      },
      secretKey,
      {
        expiresIn: 24 * 60 * 60,
      }
    )

    res.status(200).send({
      msg: '登录成功',
      data: token,
    })


  } catch (err) {
    next(err);
    console.error(err);
    res.send("Error" + err);
  } finally {
    // 无论是正常结束还是异常结束，都释放数据库连接
    if (pool_client) {
        try {
            pool_client.release(); // 释放数据库连接
        } catch (err) {
            console.error('Error releasing pool client:', err);
        }
    }
  }
};

export async function registerUser (req, res, next) {
  try {
    const { userInfo } = req.body;
    const { corporationCode, account, username, password } = userInfo;
    const corporation = await searchCorporation(corporationCode);
    const existCorporation = await verifyCpr(corporationCode);
    if (!existCorporation) {
      res.status(200).send({errorTip: 1});
      return;
    }
    const isOnlyAcc = await verifyOnlyAcc(account);
    if (!isOnlyAcc) {
      res.status(200).send({errorTip: 2});
      return;
    }
    const isOnlyUser = await verifyOnlyUser(username, corporationCode);
    if (!isOnlyUser) {
      res.status(200).send({errorTip: 3});
      return;
    }
    await addUser({ account, username, corporation, password });
    res.status(200).send(
      {
        msg: '注册成功',
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error" + error);
  }
}

export async function getUserInfo (req, res, next) {
  try {
    const { id } = req;
    console.log('id', id)
    const data = await searchUser(id);
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error" + error);
  }
} 

export async function updateUserInfo (req, res, next) {
  try {
    const { userInfo } = req.body;
    await updateUser(userInfo);
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error" + error);
  }
}


export async function getUserName (req, res, next) {
  try {
    const { id } = req;
    const data = await searchUserName(id);
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error" + error);
  }
}