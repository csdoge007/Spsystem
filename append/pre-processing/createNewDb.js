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
    WHERE row_num <= 10;`;
    pool.query(insertTableQuery, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
        } else {
            console.log('Table inserted successfully!');
        }
    })
}
