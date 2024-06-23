import UserModel from '../../models/user.model.js';
import bcrypt from 'bcrypt';

class UserService {
    async getAllUsers(){
        try{
            return await UserModel.getAllUsers();
        } catch(error){
            throw new Error(error);
        }
    }
    async getById(id){
        try{
            return await UserModel.getById(id);
        } catch(error){
            throw new Error(error);
        }
    }
    async createNewUser(user){
        try {
            const passwordString = String(user.password);
            const hashedPassword = user.password = user.password ? await bcrypt.hash(passwordString, 10) : null;
            user.password = hashedPassword;
            return await UserModel.createNewUser(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUser(id, user){
        try {
            const passwordString = String(user.password);
            const hashedPassword = user.password = user.password ? await bcrypt.hash(passwordString, 10) : null;
            user.password = hashedPassword;
            return await UserModel.updateUser(id, user);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteUser(id){
        try {
            return await UserModel.deleteUser(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new UserService();