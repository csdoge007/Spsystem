import pg from 'pg';
const config = {
    user: 'postgres',
    database: 'SPSystem',
    password: '123456',
    port: 5432,
    connectionLimit: 0,
}
const pool = new pg.Pool(config);
export default pool;