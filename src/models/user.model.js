//userModel.js
import {connection} from '../database/database.config.js';
class UserModel {
    constructor(id,name,gender,username,age,password,email){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.username = username;
        this.age = age;
        this.password = password;
        this.email = email;
    }
    async getAllUsers(){
        try{
            const [rows] = await connection.execute('SELECT * FROM users');
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
    async createUser(user){
        try{
            const {name, email, password, gender, age} = user;
            const [result] = await connection.execute('INSERT INTO users (name, email, password, gender, age) VALUES (?, ?, ?, ?, ?)', [name, email, password, gender, age]);
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
}

export default new UserModel();