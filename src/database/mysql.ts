import mysql from 'mysql2/promise';

let db: mysql.Connection;

export async function initDb() {
    db = await mysql.createConnection({
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
    });
}

export { db }