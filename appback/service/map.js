import pool from '../config.js';
import coordtransform from 'coordtransform';
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

export async function readLayers (corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
    SELECT id, name, type, group_name,isviewed,quantity FROM layer WHERE corporation = $1 And group_name='';
    `;
    const result = await pool_client.query(query, [corporation]);
    
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
    const { name, type, group_name, quantity, isviewed, corporation } = layerInfo;
    pool_client = await pool.connect();
    const query = `
    INSERT INTO layer (name, type, group_name, quantity, isviewed, corporation) VALUES ($1, $2, $3, $4, $5, $6);
    `;
    const query2 = `
    INSERT INTO layer_new (name, type, quantity, corporation) VALUES ($1, $2, $3, $4);
    `;
    await pool_client.query(query, [name, type, group_name, quantity, isviewed, corporation]);
    await pool_client.query(query2, [name, type, quantity, corporation]);

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

export async function getElements (corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
    SELECT * FROM point WHERE corporation=$1 And isupload = false;
    `;
    const result = await pool_client.query(query, [corporation]);
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

export async function changeView (name, corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
    UPDATE layer
    SET isviewed = CASE
        WHEN isviewed = true THEN false
        ELSE true
      END
    WHERE name = $1 And corporation = $2;
    `;
    await pool_client.query(query, [name, corporation]);
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

export async function searchPoint (name, corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
      SELECT locationx, locationy
        FROM point
        WHERE title = $1 And corporation = $2
        LIMIT 1;
    `;
    const { rows } = await pool_client.query(query, [name, corporation]);
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
async function getResidentQuantity (pointInfo) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const {location:[x, y], radius } = pointInfo;
    const query = `
      SELECT COUNT(*) AS re_count 
      FROM poppoi_nj_wgs
      WHERE ST_DWithin(
        poppoi_nj_wgs.geom::geography, 
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, 
        $3
      )
    `;
    const { rows } = await pool_client.query(query, [x, y, radius]);
    console.log('居民区数量', rows[0].re_count);
    return rows[0].re_count;
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
export async function getResidentScore (pointInfo) {
  const { radius } = pointInfo;
  const qRadius = radius / 1000;
  const density = 3666 / 6587;
  const quantity = await getResidentQuantity(pointInfo);
  const avq =  quantity / (Math.PI * Math.pow(qRadius, 2));
  const score = 50 + 50 / (1 + Math.pow(Math.E,-0.5 * (avq - density)));
  console.log('score', score);
  return Math.round(score * 100) / 100;
}

async function getCompetitorQuantity (pointInfo) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const { location:[x, y], radius, category } = pointInfo;
    const query = `
      SELECT COUNT(*) AS com_count 
      FROM njpoi_2020_new
      WHERE ST_DWithin(
        njpoi_2020_new.geom::geography, 
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, 
        $3
      ) AND substring(type FROM '([^;]+)') = $4;
    `;
    const { rows } = await pool_client.query(query, [x, y, radius, category]);
    console.log('竞争者数量', rows[0].com_count);
    return rows[0].com_count;
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

export async function getCompetitorScore (pointInfo) {
  const quantity = await getCompetitorQuantity(pointInfo);
  const { category, radius } = pointInfo;
  const num = category === '事件活动' ? 1 : 100;
  const density = num / 6587; 
  const qRadius = radius / 1000;
  const avq =  quantity / (Math.PI * Math.pow(qRadius, 2));
  const score = 50 + 50 / (1 + Math.pow(Math.E,-0.5 * (density - avq)));
  return Math.round(score * 100) / 100;
}

export async function getTrafficQuantity (pointInfo) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const { location:[x, y], radius } = pointInfo;
    const query = `   
    SELECT COUNT(*) AS com_count
    FROM traffic
    WHERE (fclass='trunk'  OR fclass='primary') AND ST_DWithin(traffic.geom, 
      ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3);
    `;
    const { rows } = await pool_client.query(query, [x, y, radius]);
    console.log('com_count', rows[0].com_count);
    return rows[0].com_count;
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

export async function getTrafficScore (pointInfo) {
  const { radius } = pointInfo;
  const density = 3437 / 6587;
  const quantity = await getTrafficQuantity(pointInfo);
  const qRadius = radius / 1000;
  const avq =  quantity / (Math.PI * Math.pow(qRadius, 2));
  const score = 50 + 50 / (1 + Math.pow(Math.E,-0.5 * (avq - density)));
  return Math.round(score * 100) / 100;
}

export async function deleteEditLayer (layerName, corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `DELETE FROM layer WHERE name=$1 And corporation=$2;
    `;
    await pool_client.query(query, [layerName, corporation]);
    const query2 = `DELETE FROM point WHERE layer = $1 and corporation = $2;`
    const query3 = `DELETE FROM layer_new WHERE name=$1 And corporation = $2;`
    await pool_client.query(query2, [layerName, corporation]);
    await pool_client.query(query3, [layerName, corporation]);


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

export async function updateLayerName (layerInfo, corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const { name, id } = layerInfo;
    const query = `UPDATE layer SET name = $1 WHERE name = $2 AND corporation = $3`;
    const query2 = `UPDATE layer_new SET name = $1 WHERE name = $2 AND corporation = $3`;
    const query3 = `UPDATE point SET layer = $1 WHERE layer = $2 AND corporation = $3`;
    await pool_client.query(query, [name, id, corporation]);
    await pool_client.query(query2, [name, id, corporation]);
    await pool_client.query(query3, [name, id, corporation]);
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

export async function getPointsAccess ({pointsInfo, radius, type}) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const createFunctionQuery = `
      CREATE OR REPLACE FUNCTION calculate_sum(x_val double precision, y_val double precision, radius_val integer, poitype_val text)
      RETURNS double precision AS
      $$ 
      DECLARE 
        sum double precision := 0; 
        poi_rec RECORD;
        poi_count integer; 
      BEGIN 
        FOR poi_rec IN SELECT *
            FROM poppoi_nj_wgs
            WHERE ST_DWithin(
              poppoi_nj_wgs.geom::geography, 
              ST_SetSRID(ST_MakePoint(x_val, y_val), 4326)::geography, 
              radius_val
            ) LOOP 
          SELECT COUNT(*) + 1 INTO poi_count 
          FROM njpoi_2020_new 
          WHERE ST_DWithin(njpoi_2020_new.geom::geography, poi_rec.geom::geography, radius_val)
          AND substring(type FROM '([^;]+)') = poitype_val;
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
    });
    const reachabilityQueries = pointsInfo.map(point => {
      const wgs84 = coordtransform.gcj02towgs84(point.locationx, point.locationy);
      return pool_client.query(`SELECT calculate_sum($1, $2, $3, $4) AS result_sum;`, [ wgs84[0],  wgs84[1], Number(radius), type]);
    });
    const results = await Promise.all(reachabilityQueries);
    const resultSums = results.map((result, idx) => {
      return {
        resultSums: Number(result.rows[0].result_sum.toFixed(2)),
        x: pointsInfo[idx].locationx,
        y: pointsInfo[idx].locationy,
      }
    });
    resultSums.sort((a, b) => b.resultSums - a.resultSums);
    return resultSums;
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

export async function dropPoint (pointInfo, corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const { id, layer } = pointInfo;
    const query = `DELETE FROM point WHERE id = $1;`;
    const query2 = 'UPDATE layer SET quantity = quantity - 1 WHERE name = $1 And corporation = $2';
    const query3 = 'UPDATE layer_new SET quantity = quantity - 1 WHERE name = $1 And corporation = $2';
    await pool_client.query(query, [id]);
    await pool_client.query(query2, [layer, corporation]);
    await pool_client.query(query3, [layer, corporation]);

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

export async function readNewLayers (corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `SELECT * FROM layer_new WHERE corporation = $1`;
    const data = await pool_client.query(query, [corporation]);
    return data.rows;
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

export async function getTotalQuantity (corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
    SELECT COUNT(*) AS cnt
    FROM layer_new WHERE corporation = $1;
    `;
    const data = await pool_client.query(query, [corporation]);
    return data.rows[0].cnt;
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

export async function selectCurrentItems (itemInfo, corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const { currentPage, itemQuantity } = itemInfo;
    const query = `
    SELECT *
    FROM layer_new
    WHERE corporation = $1
    OFFSET (($2 - 1) * $3) ROWS
    LIMIT $3;
    `;
    const data = await pool_client.query(query, [corporation, currentPage, itemQuantity]);
    return data.rows;
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

export async function getLayerData (corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
    SELECT layer.name, layer.type, layer.quantity, layer.updatetime
    FROM layer
    LEFT JOIN layer_new ON layer.name = layer_new.name
    WHERE layer_new.name IS NULL; 
    `;
    const data = await pool_client.query(query);
    return data.rows;
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

export async function updateLayerNew (layerData, corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const values = layerData.map(obj => `('${obj.name}', '${obj.type}', ${obj.quantity}, '${obj.updatetime}', '${corporation}')`).join(',');
    // const values = layerData.map(layer => {
    //   const { name, type, quantity, updatetime } = layer;
    //   return [name, type, quantity, updatetime, corporation];
    // });
    const query = `
      INSERT INTO layer_new (name, type, quantity, updatetime, corporation)
      VALUES ${values};
    `;
     await pool_client.query(query);
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

export async function dropNewLayer (layerName, corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
    DELETE FROM layer_new WHERE name = $1 And corporation = $2;
    `;
    await pool_client.query(query, [layerName, corporation]);
    const query1 = `
    SELECT COUNT(*) AS re_count FROM layer WHERE name = $1 And corporation = $2;
    `
    const res1 = await pool_client.query(query1, [layerName, corporation]);
    if (res1.rows[0].re_count == 0) {
      // 说明该图层是上传的数据
      const query2 = `
        DELETE FROM point WHERE layer = $1 And corporation = $2;
      `;
      await pool_client.query(query2, [layerName, corporation]);
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

export async function uploadPoint (data, corporation) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const { points, layers } = data;
    const values = points.map(obj => `('${obj.title}', '${obj.locationx}', ${obj.locationy}, '${obj.category}', '${corporation}', '${obj.layer}', '${obj.address}', '${obj.description}', '${obj.isupload}')`).join(',');
    const query = `
      INSERT INTO point (title, locationx, locationy, category, corporation, layer, address, description, isupload)
      VALUES ${values};
    `;
    await pool_client.query(query);
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const time = `${year}-${month}-${date}`;
    const layersQuery = layers.map(layer => {
      return pool_client.query('INSERT INTO layer_new (name, type, quantity, corporation, updatetime) VALUES ($1, $2, $3, $4, $5)', [
        layer[0],
        'point',
        layer[1],
        corporation,
        time,
      ])
    });
    await Promise.all(layersQuery);
    // const query = `
    // DELETE FROM layer_new WHERE name = $1 And corporation = $2;
    // `;
    // await pool_client.query(query, [layerName, corporation]);
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