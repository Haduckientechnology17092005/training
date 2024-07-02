import mysql from 'mysql2/promise';
// const mysql = require('mysql2/promise')

const DBConfig = {
    host: 'localhost',
    user: 'root',
    password: 'MySecurePass1!',
    port: 3306,
    database:'SGROUP',
};

const connection = mysql.createPool(DBConfig);

const a = async () => {
    try{
            const conn = await connection.getConnection()
            const [rows, fields] = await connection.execute('SELECT * FROM users');
            connection.releaseConnection(conn)
            console.log(rows)
            return rows;
        } catch(error){
            console.log(error);
            throw new Error(error);
        }
}

a()
export { connection };
