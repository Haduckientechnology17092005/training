//config.js
import mysql from 'mysql2/promise';
const DBConfig = {
    host: 'localhost',
    user: 'root',
    password: '17092005',
    database: 'SGROUP'
};
export const connection = mysql.createPool(DBConfig);