import pool from '../config.js';
export async function circleSelectPoi (location, tableName, radius) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const [x, y] = location;
    const query = `
      SELECT *
      FROM ${tableName}
      WHERE ST_DWithin(
        ${tableName}.geom::geography, 
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, 
        $3
      );
    `;
    const result = await pool_client.query(query, [x, y, radius]);
    return result;
  }catch (err) {
    // next(err);
    console.error(err);
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
}

export async function readLayers () {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
    SELECT name, type, group_name, quantity FROM layer;
    `;
    const result = await pool_client.query(query);
    
    return result.rows;
  }catch (err) {
    // next(err);
    console.error(err);
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
}

export async function createLayer (layerInfo) {
  let pool_client;
  try {
    const { name, type, group_name, quantity } = layerInfo;
    pool_client = await pool.connect();
    const query = `
    INSERT INTO layer (name, type, group_name, quantity) VALUES ($1, $2, $3, $4);
    `;
    await pool_client.query(query, [name, type, group_name, quantity]);
  } catch (err) {
    // next(err);
    console.error(err);
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
}

export async function getElements () {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
    SELECT * FROM point;
    `;
    const result = await pool_client.query(query);
    return result.rows;
  } catch (err) {
    // next(err);
    console.error(err);
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
}
