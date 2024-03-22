import pool from "../config.js";
import convert from "../utils/convert.js";
import { circleSelectPoi } from "../service/map.js";
export async function getPoi(req, res, next) {
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

export async function searchPoi(req, res, next) {
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
export async function boxSelectPoi(req, res, next) {
  try {
    const { polygon } = req.body;
    if (polygon.type === 'circle') {
      const { radius, coordinates: [lng, lat] } = polygon;
      const result = await circleSelectPoi([lng, lat], 'njpoi_2020_new', radius);
      res.status(200).send(result.rows);
    }
  } catch (err) {
    next(err);
    console.error(err);
    res.send("Error" + err);
  }
};

export async function getAccessibility(req, res, next) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const { x, y, radius } = req.query;
    const createFunctionQuery = `
      CREATE OR REPLACE FUNCTION calculate_sum(x_val double precision, y_val double precision, radius_val integer)
      RETURNS double precision AS
      $$ 
      DECLARE 
        sum double precision := 0; 
        poi_rec RECORD;
        poi_count integer; 
      BEGIN 
        FOR poi_rec IN SELECT *
            FROM poppoi_nj
            WHERE ST_DWithin(
              poppoi_nj.geom::geography, 
              ST_SetSRID(ST_MakePoint(x_val, y_val), 4326)::geography, 
              radius_val
            ) LOOP 
          SELECT COUNT(*) INTO poi_count 
          FROM njpoi_2020_new 
          WHERE ST_DWithin(njpoi_2020_new.geom, poi_rec.geom, radius_val); 
          IF poi_count > 0 THEN 
            sum := sum + 1.0 / poi_count; 
          END IF; 
        END LOOP; 
        
        -- 返回计算得到的 sum 值
        RETURN sum;
      END;
      $$
      LANGUAGE plpgsql;
    `;
    pool_client.query(createFunctionQuery, (err, result) => {
      if (err) {
        console.error('Error executing SQL:', err);
        return;
      }
    
      // 创建函数成功
      console.log('Function created successfully');
    });
    pool_client.query(`SELECT calculate_sum($1, $2, $3) AS result_sum;`, [x, y, radius], (err, result) => {
      if (err) {
        console.error('Error executing SQL:', err);
        return;
      }

      // 从查询结果中获取 result_sum 的值
      const result_sum = result.rows[0].result_sum;

      // 输出 result_sum
      console.log('Result sum:', result_sum);
      res.status(200).send({accessibility:result_sum});
    });
    // res.status(200).send(mallPois.rows);
  } catch (err) {
    console.error(err);
  }

}
