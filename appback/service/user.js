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
export async function verifyCpr (corporationCode) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `   
      SELECT * FROM corporation
      WHERE code = $1;
    `;
    const { rows } = await pool_client.query(query, [corporationCode]);
    return rows.length > 0;
  } catch (err) {
    console.error(err);
  } finally {
    if (pool_client) {
      try {
          pool_client.release(); // 释放数据库连接
      } catch (err) {
          console.error('Error releasing pool client:', err);
      }
    }
  }
}

export async function verifyOnlyAcc (account) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `   
      SELECT * FROM users
      WHERE account = $1;
    `;
    const { rows } = await pool_client.query(query, [account]);
    return rows.length === 0;
  } catch (err) {
    console.error(err);
  } finally {
    if (pool_client) {
      try {
          pool_client.release(); // 释放数据库连接
      } catch (err) {
          console.error('Error releasing pool client:', err);
      }
    }
  }
}

export async function verifyOnlyUser (username, corporationCode) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `   
    SELECT COUNT(*) AS count
    FROM users
    JOIN (
        SELECT name
        FROM corporation
        WHERE code = $1
    ) AS c ON users.corporation = c.name
    WHERE users.username = $2;
    `;
    const { rows } = await pool_client.query(query, [corporationCode, username]);
    console.log(rows);
    return rows[0].count === '0';
  } catch (err) {
    console.error(err);
  } finally {
    if (pool_client) {
      try {
          pool_client.release(); // 释放数据库连接
      } catch (err) {
          console.error('Error releasing pool client:', err);
      }
    }
  }
}

export async function addUser (userInfo) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const { account, password, username, corporation } = userInfo;
    const query = `
    INSERT INTO users (account, password, username, corporation) VALUES ($1, $2, $3, $4);
    `;
    await pool_client.query(query, [account, password, username, corporation]);
  } catch (err) {
    console.error(err);
  } finally {
    if (pool_client) {
      try {
          pool_client.release(); // 释放数据库连接
      } catch (err) {
          console.error('Error releasing pool client:', err);
      }
    }
  }
}

export async function searchCorporation (corporationCode) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
    SELECT name FROM corporation
    WHERE code = $1;
    `;
    const { rows } = await pool_client.query(query, [corporationCode]);
    return rows[0].name;
  } catch (err) {
    console.error(err);
  } finally {
    if (pool_client) {
      try {
          pool_client.release(); // 释放数据库连接
      } catch (err) {
          console.error('Error releasing pool client:', err);
      }
    }
  }
}

export async function searchUser (id) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
      SELECT account, password, username, corporation, ismanager
      FROM users
      WHERE id = $1;
    `;
    const { rows } = await pool_client.query(query, [id]);
    return rows[0];
  } catch (err) {
    console.error(err);
  } finally {
    if (pool_client) {
      try {
          pool_client.release(); // 释放数据库连接
      } catch (err) {
          console.error('Error releasing pool client:', err);
      }
    }
  }
}

export async function updateUser (userInfo) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const { account, data, type } = userInfo;
    const query1 = `
      UPDATE users SET username = $1
      WHERE account = $2;
    `;
    const query2 = `
      UPDATE users SET password = $1
      WHERE account = $2;
    `;
    if (type === 'username') {
      await pool_client.query(query1, [data, account]);
    } else {
      await pool_client.query(query2, [data, account]);  
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (pool_client) {
      try {
          pool_client.release(); // 释放数据库连接
      } catch (err) {
          console.error('Error releasing pool client:', err);
      }
    }
  }
}

export async function searchUserName (id) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
      SELECT username, ismanager FROM users
      WHERE id = $1;
    `;
    const data = await pool_client.query(query, [id]);  
    return data.rows[0];
  } catch (err) {
    console.error(err);
  } finally {
    if (pool_client) {
      try {
          pool_client.release(); // 释放数据库连接
      } catch (err) {
          console.error('Error releasing pool client:', err);
      }
    }
  }
}