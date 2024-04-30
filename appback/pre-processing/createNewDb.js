import pool from "../config.js";
// import format from 'pg-format';
export default function createNewDb() {
    // const pool_client = await pool.connect();
    // const data = await pool_client.query(`
    // WITH ranked_shops AS (
    //     SELECT *,
    //            ROW_NUMBER() OVER (PARTITION BY substring(type FROM '([^;]+)')) AS row_num
    //     FROM njpoi_2020
    // )
    // SELECT *
    // FROM ranked_shops
    // WHERE row_num <= 200`);
    // console.log(data.rows);
    const createTableQuery = `CREATE TABLE IF NOT EXISTS njpoi_2020_new (
        gid INT PRIMARY KEY,
        name VARCHAR(255),
        type VARCHAR(255),
        tel VARCHAR(255),
        locationx VARCHAR(255),
        locationy VARCHAR(255),
        pname VARCHAR(255),
        city VARCHAR(255),
        district VARCHAR(255),
        citycode INT,
        adcode INT,
        typecode INT,
        address TEXT,
        bdx VARCHAR(255),
        bdy VARCHAR(255),
        gpsx VARCHAR(255),
        gpsy VARCHAR(255),
        geom VARCHAR(255)
    );`;

    // 执行 SQL 查询
    pool.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
        } else {
            console.log('Table created successfully!');
        }
    });
    
    const insertTableQuery = `INSERT INTO njpoi_2020_new (gid, name, type, tel, locationx, locationy, pname, city, district, citycode, adcode, typecode, address, bdx, bdy, gpsx, gpsy, geom)
    SELECT gid, name, type, tel, locationx, locationy, pname, city, district, citycode, adcode, typecode, address, bdx, bdy, gpsx, gpsy, geom
    FROM (
      SELECT *,
             ROW_NUMBER() OVER (PARTITION BY substring(type FROM '([^;]+)') ORDER BY gid) AS row_num
      FROM njpoi_2020
    ) AS subquery
    WHERE row_num <= 100;`;
    pool.query(insertTableQuery, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
        } else {
            console.log('Table inserted successfully!');
        }
    })
}

async function countByType () {
  const types = ["摩托车服务","购物服务","道路附属设施","通行设施","医疗保健服务","住宿服务","地名地址信息","汽车销售","风景名胜","汽车服务","餐饮服务","公共设施","交通设施服务","生活服务","金融保险服务","体育休闲服务","商务住宅","事件活动","室内设施","汽车维修","公司企业","政府机构及社会团体","科教文化服务"];
  let pool_client;
  const typeRes = {};
  try {
    pool_client = await pool.connect();
    const query = `
      SELECT COUNT(*) AS count
      FROM njpoi_2020 WHERE substring(type FROM '([^;]+)') = $1;
    `;
    const resArr = types.map(async (type, idx) => {
      return await pool_client.query(query, [type]);
    })
    const results = await Promise.all(resArr);
    results.forEach((result,idx) => {
      typeRes[types[idx]] = result.rows[0].count;
    });
    return typeRes;
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
await countByType();