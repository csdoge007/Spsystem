import pool from "../config.js";
import { update } from '../utils/crud.js';
export default async function getTypes() {
    const pool_client = await pool.connect();
    const data = await pool_client.query(`SELECT DISTINCT substring(type FROM '([^;]+)') 
    AS store_type FROM njpoi_2020`);
    const arrTypes = data.rows.map((item) => item.store_type);
    update('../data/store_types.json', JSON.stringify(arrTypes));
};
