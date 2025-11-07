import mysql from 'mysql2/promise';

const connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME || 'sistema_os'
};

let connection: mysql.Connection;

async function dbConnect() {
    try {
        const connection = await mysql.createConnection(connectionConfig);
        console.log('Database connected successfully!');
        return connection;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}

dbConnect().then((conn) => {
    connection = conn;
})

export { connection }
