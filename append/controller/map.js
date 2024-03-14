import pool  from "../config.js";
import convert from "../utils/convert.js";
export async function getPoi (req, res, next) {
  let pool_client;
  try {
      pool_client = await pool.connect();
      const data = await pool_client.query('SELECT * FROM njpoi_2020_new');
      const pointData = convert(data.rows); 
      // console.log(pointData);
      res.status(200).send(pointData);
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

export async function searchPoi (req, res, next) {
  let pool_client;
  try {
    const query = req.query.query;
    if (query === '') {
      res.status(200).send([]);
      return;
    }
    pool_client = await pool.connect();
    const result = await pool_client.query(`SELECT * FROM njpoi_2020_new WHERE name ILIKE '%' || $1 || '%'`, [query]);
    res.status(200).send(result.rows);
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
export async function boxSelectPoi (req, res, next) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const { polygon } = req.body;
    if (polygon.type === 'circle') {
      const { radius, coordinates:[lng, lat] }  = polygon;
      const query = `
        SELECT *
        FROM njpoi_2020_new
        WHERE ST_DWithin(
          njpoi_2020_new.geom::geography, 
          ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, 
          $3
        );
      `;
      const result = await pool_client.query(query, [lng, lat, radius]);
      res.status(200).send(result.rows);
    }
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