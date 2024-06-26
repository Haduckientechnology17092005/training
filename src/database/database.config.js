//config.js
import mysql from 'mysql2/promise';
const DBConfig = {
    host: 'localhost',
    user: 'root',
    password: 'haduckien',
    use: 'SGROUP',
    port: 3307,
    database: 'SGROUP'
};
export const connection = mysql.createPool(DBConfig);