import pool  from "../config.js";
export async function boxSelectPoi (req, res) {
  try {
    const pool_client = await pool.connect();
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
    console.error(err);
    res.send("Error" + err);
  }
};