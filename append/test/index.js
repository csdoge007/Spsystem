import pool from "../config.js";
import coordtransform from 'coordtransform';
const x = '118.8907814025879';
const y = '32.11686521914468';
const wgs84 = coordtransform.gcj02towgs84(x, y);

/**
 * 测试分类选址
 */
async function solve() {
  const pool_client = await pool.connect();
  const query1 = `
    SELECT * FROM poppoi_nj_wgs WHERE 
    ST_DWithin(
      poppoi_nj_wgs.geom::geography, 
      ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, 
      5000
    )
  `;
  const result1 = await pool_client.query(query1, [...wgs84]);
  // console.log(result1.rows);
  const name = '摩托车服务';

  // const wgs = coordtransform.gcj02towgs84(result1.rows[0].x, result1.rows[0].y);
  // console.log(wgs);
  // const res = await pool_client.query(`
  //     SELECT * FROM njpoi_2020_new WHERE
  //     ST_DWithin(
  //       njpoi_2020_new.geom::geography, 
  //       ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, 
  //       5000
  //     ) AND substring(type FROM '([^;]+)') = '${name}';
  //   `, [...wgs]);
  // console.log(res.rows);

  const query2 = result1.rows.map(point => {
    // console.log(point.x, point.y);
    const wgs = coordtransform.gcj02towgs84(point.x, point.y);
    return pool_client.query(`
      SELECT * FROM njpoi_2020_new WHERE
      ST_DWithin(
        njpoi_2020_new.geom::geography, 
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, 
        5000
      ) AND substring(type FROM '([^;]+)') = '${name}';
    `, [...wgs]);
  });
  const result2 = await Promise.all(query2);
  // console.log(result2);
  let sum = result2.reduce((prev, cur) => {
    if (cur.rows.length > 0) {
      return prev + 1 / cur.rows.length;
    } else {
      return prev;
    }
  }, 0);
  console.log('测试结果为', sum);
};

solve();