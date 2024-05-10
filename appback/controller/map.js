import pool from "../config.js";
import convert from "../utils/convert.js";
import * as turf from '@turf/turf';
import { 
  circleSelectPoi, 
  readLayers, 
  createLayer, 
  getElements, 
  changeView, 
  getRentScore, 
  searchPoint, 
  getResidentScore,
  getCompetitorScore,
  getTrafficScore,
  deleteEditLayer,
  updateLayerName,
  getPointsAccess } from "../service/map.js";
import coordtransform from 'coordtransform';
export async function getPoi(req, res, next) {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const data = await pool_client.query('SELECT * FROM njpoi_2020_new');
    const pointData = convert(data.rows);
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
      // const result = await circleSelectPoi([lng, lat], 'poppoi_nj', radius);
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
    const { radius, layer, type } = req.query;
    const { corporation } = req;
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
          SELECT COUNT(*) INTO poi_count 
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
      // 创建函数成功
    });
    // 查询layer名为layer的点
    const resultPoints = await pool_client.query('SELECT * FROM point WHERE layer = $1 And category = $2 And corporation = $3', [layer, type, corporation]);
    const points = resultPoints.rows;
    const reachabilityQueries = points.map(point => {
      const wgs84 = coordtransform.gcj02towgs84(point.locationx, point.locationy);
      return pool_client.query(`SELECT calculate_sum($1, $2, $3, $4) AS result_sum;`, [ wgs84[0],  wgs84[1], Number(radius), type]);
    });
    
    const results = await Promise.all(reachabilityQueries);
    const resultSums = results.map((result, idx) => {
      return {
        resultSums: result.rows[0].result_sum.toFixed(2),
        name: points[idx].title,
        category: points[idx].category,
        x: points[idx].locationx,
        y: points[idx].locationy,
        radius: Number(radius),
      }
    });
    resultSums.sort((a, b) => b.resultSums - a.resultSums);
    res.status(200).send({accessibility:resultSums});
  
    // res.status(200).send(mallPois.rows);
  } catch (err) {
    console.error(err);
    next(err);
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

export async function addPoint(req, res, next) {
  let pool_client;
  try {
    const { pointInfo } = req.body;
    const { corporation } = req;
    const { layer, title, description, address, x, y, category } = pointInfo;
    const locationx = parseFloat(x);
    const locationy = parseFloat(y);
    pool_client = await pool.connect();
    const insertSql = `
    INSERT INTO point (title, layer, locationx, locationy, description, address, category, corporation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    const updateSql = `
    UPDATE layer SET quantity = quantity + 1 WHERE name = $1 And corporation = $2;
    `
    await pool_client.query(insertSql, [title, layer, locationx, locationy, description, address, category, corporation]);
    await pool_client.query(updateSql, [layer, corporation]);
    res.status(200).send();
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

export async function getLayers(req, res, next) {
  try {
    const layers = await readLayers();
    const { corporation } = req;
    const layerMap = new Map();
    for (const layer of layers) {
      layerMap[layer.name] = layer;
    }
    // 获取点、线、面三要素
    const elements = await getElements(corporation);
    for (const element of elements) {
      const layer = layerMap[element.layer];
      layer.children = layer.children ? [...layer.children, element] : [element];
    }
    res.status(200).send(layers);
  } catch (err) {
    next(err);
    console.error(err);
    res.send("Error" + err);
  }
};

export async function addLayer (req, res, next) {
  try {
    const { layerInfo } = req.body;
    const { corporation } = req;
    await createLayer({ corporation, ...layerInfo});
    res.status(200).send();
  } catch (err) {
    next(err);
    console.error(err);
    res.send("Error" + err);
  }
}
export async function updateView (req, res, next) {
  try {
    const { name } = req.body;
    const { corporation } = req;
    await changeView(name, corporation);
    res.status(200).send();
  } catch (err) {
    next(err);
    console.error(err);
    res.send("Error" + err);
  }
}

export async function getScores (req, res, next) {
  try {
    const { name, radius, category } = req.query;
    const { corporation } = req;
    const { locationx, locationy } = await searchPoint(name, corporation); 
    const wgs84 = coordtransform.gcj02towgs84(locationx, locationy);
    const promiseArr = [
      getRentScore(wgs84),
      getResidentScore({location: wgs84, radius}),
      getCompetitorScore({ location: wgs84, radius, category }),
      getTrafficScore({location: wgs84, radius}),
    ];
    const results = await Promise.all(promiseArr);
    const [rent, resident, competitor, traffic] = results;
    res.status(200).send({
      rent,
      resident,
      traffic,
      competitor,
    });
  } catch (err) {
    next(err);
    console.error(err);
    res.status(500).send("Error" + err);
  }
}

export async function deleteLayer (req, res, next) {
  try {
    const { layerName } = req.query;
    const { corporation } = req;
    await deleteEditLayer(layerName, corporation);
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error" + error);
  }
}

export async function reLayerName (req, res, next) {
  try {
    const { layerInfo } = req.body;
    const { corporation } = req;
    await updateLayerName(layerInfo, corporation);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error" + error);
  }
}

function generatePoints ({l, r, t, d}) {
  const width = r - l;
  const height = t - d;
  const res = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      const x = l + width / 10 * (2 * j + 1);
      const y = t - height / 8 * (2 * i + 1);
      res.push([x, y]);
    }
  }
  return res;
}

export async function getThermalData (req, res, next) {
  try {
    const { boxInfo, type, radius } = req.body;
    const pointsPosition = generatePoints({
      l: boxInfo[0][1],
      r: boxInfo[2][1],
      t: boxInfo[2][0],
      d: boxInfo[0][0],
    });
    console.log('pointsPosition', pointsPosition);
    console.log('boxInfo', boxInfo);
    const pointsInfo = pointsPosition.map(point => {
      return {
        locationx: point[0],
        locationy: point[1],
      }
    });
    const data = await getPointsAccess({ pointsInfo, type, radius });
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error" + error);
  }
}