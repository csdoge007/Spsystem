import pg from 'pg';
const config = {
    user: 'postgres',
    database: 'SPSystem',
    password: '123456',
    port: 5432,
}
const pool = new pg.Pool(config);
export const secretKey = 'csdoge007';
export default pool;