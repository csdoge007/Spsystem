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
    SELECT name, type, group_name,isviewed,quantity FROM layer;
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
    const { name, type, group_name, quantity, isviewed } = layerInfo;
    pool_client = await pool.connect();
    const query = `
    INSERT INTO layer (name, type, group_name, quantity, isviewed) VALUES ($1, $2, $3, $4, $5);
    `;
    await pool_client.query(query, [name, type, group_name, quantity, isviewed]);
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

export async function changeView (name) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
    UPDATE layer
    SET isviewed = CASE
        WHEN isviewed = true THEN false
        ELSE true
      END
    WHERE name = $1;
    `;
    await pool_client.query(query, [name]);
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

async function searchDistrict (location) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const [x, y] = location;
    const query = `
    SELECT name
      FROM nj
      WHERE ST_Contains(nj.geom, ST_SetSRID(ST_MakePoint($1, $2), 4326));
    `;
    const { rows } = await pool_client.query(query, [x, y]);
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

export async function searchPoint (name) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
      SELECT locationx, locationy
        FROM point
        WHERE title = $1
        LIMIT 1;
    `;
    const { rows } = await pool_client.query(query, [name]);
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
export async function getRentScore (location) {
  const rents = {
    '溧水区': 100,
    '六合区': 95,
    '高淳区': 90,
    '浦口区': 85,
    '雨花台区': 80,
    '江宁区': 75,
    '栖霞区': 70,
    '鼓楼区': 65,
    '建邺区': 60,
    '玄武区': 55,
    '秦淮区': 50
  };
  const district = await searchDistrict(location);
  return rents[district];
}