import pool  from "../config.js";
import convert from "../utils/convert.js";
export async function getPoi (req, res) {
    try {
        const pool_client = await pool.connect();
        const data = await pool_client.query('SELECT * FROM njpoi_2020_new');
        const pointData = convert(data.rows); 
        res.status(200).send(pointData);
    } catch (err) {
        console.error(err);
        res.send("Error" + err);
    }
};

export async function searchPoi (req, res) {
  try {
    const query = req.query.query;
    if (query === '') {
      res.status(200).send([]);
      return;
    }
    const pool_client = await pool.connect();
    const result = await pool_client.query(`SELECT * FROM njpoi_2020_new WHERE name ILIKE '%' || $1 || '%'`, [query]);
    res.status(200).send(result.rows);
  } catch (err) {
    console.error(err);
    res.send("Error" + err);
  }
};
