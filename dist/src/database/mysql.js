"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var mysql2_1 = __importDefault(require("mysql2"));
var connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    port: Number(process.env.DB_PORT) || 3306,
};
var connection;
function createConnectionWithRetry(retries, delay) {
    if (retries === void 0) { retries = 5; }
    if (delay === void 0) { delay = 3000; }
    return new Promise(function (resolve, reject) {
        var attemptConnection = function (attemptsLeft) {
            var conn = mysql2_1.default.createConnection(connectionConfig);
            conn.connect(function (err) {
                if (err) {
                    console.error("Database connection failed. Attempts left: ".concat(attemptsLeft));
                    console.error(err.message);
                    if (attemptsLeft === 0) {
                        reject(err);
                        return;
                    }
                    console.log("Retrying in ".concat(delay / 1000, " seconds..."));
                    setTimeout(function () { return attemptConnection(attemptsLeft - 1); }, delay);
                }
                else {
                    console.log('Database connected successfully!');
                    resolve(conn);
                }
            });
        };
        attemptConnection(retries);
    });
}
// Initialize connection with retry logic
createConnectionWithRetry()
    .then(function (conn) {
    exports.connection = connection = conn;
})
    .catch(function (err) {
    console.error('Failed to connect to database after multiple attempts:', err);
    process.exit(1);
});
