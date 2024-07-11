import UserModel from '../../models/user.model.js';
import bcrypt from 'bcrypt';

class UserService {
    async getAllUsers(){
        try{
            return await this.UserModel.getAllUsers();
        } catch(error){
            throw new Error(error);
        }
    }
    async getById(id){
        try{
            return await this.UserModel.getById(id);
        } catch(error){
            throw new Error(error);
        }
    }
    async createUser(user) {
    try {
        if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        } else {
            user.password = null;
        }
        return await UserModel.createUser(user);
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}
   
    async updateUser(id, user){
        try {
            const passwordString = String(user.password);
            const hashedPassword = user.password = user.password ? await bcrypt.hash(passwordString, 10) : null;
            user.password = hashedPassword;
            return await this.UserModel.updateUser(id, user);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteUser(id){
        try {
            return await this.UserModel.deleteUser(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new UserService();