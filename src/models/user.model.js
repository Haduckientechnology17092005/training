//userModel.js
import {connection} from '../database/database.config.js';
class UserModel {
    async getAllUsers(){
        try{
            const conn = await connection.getConnection()
            const [rows, fields] = await connection.execute('SELECT * FROM users');
            connection.releaseConnection(conn)
            return rows;
        } catch(error){
            throw new Error(error);
        }
    }
    async getById(id){
        try{
            const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch(error){
            throw new Error(error);
        }
    }
    async getByUsername(username){
        try{
            const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
            return rows[0];
        } catch(error){
            throw new Error(error);
        }
    }
    async createUser(user){
        try{
            const {name, email,username, password, gender, age} = user;
            const [result] = await connection.execute('INSERT INTO users (username, name, email, password, gender, age) VALUES (?, ?, ?, ?, ?, ?)', [username,name, email, password, gender, age]);
            return result.insertId;
        } catch(error){
            throw new Error(error);
        }
    }
    async updateUser(id, user){
        try{

            const {name, email, password, gender, age} = user;
            const [result] = await connection.execute(
                'UPDATE users SET name = ?, email = ?, password = ?, gender = ?, age = ? WHERE id = ?',
                [name, email, password, gender, age, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteUser(id){
        try{
            const [result] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch(error){
            throw new Error(error);
        }
    }
    async getByEmail(email){
        try{
            const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch(error){
            throw new Error(error);
        }
    }
}

const userModel = new UserModel();
export default userModel;