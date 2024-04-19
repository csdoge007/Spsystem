import pool from "../config.js";

export async function getUserByAccount(account) {
  const pool_client = await pool.connect();
  const query = "SELECT * FROM users WHERE account = $1";
  const result = await pool_client.query(query, [account]);
  if (pool_client) {
    try {
        pool_client.release(); // 释放数据库连接
    } catch (err) {
        console.error('Error releasing pool client:', err);
    }
  }
  return result.rows[0];
};
