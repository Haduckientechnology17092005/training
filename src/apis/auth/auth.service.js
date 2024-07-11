import jwt from 'jsonwebtoken';
import UserModel from '../../models/user.model.js';
import userService from '../../service/mail.service.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import authenticationService from '../../service/authentication.service.js';
class AuthService {  
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    async login(username, password) {
        try {
            const user = await UserModel.getByUsername(username);
            console.log(user);
            if (!user) {
                return new Error('User not found');
            }
            console.log(password)
            console.log(user.password)
            const passwordhash = await bcrypt.compare(password, user.password);
            console.log(passwordhash)
            if(!passwordhash) {
                return new Error('Incorrect password');
            }
            console.log('Login successful');
            console.log(process.env.JWT_SECRET)
            const payload = { id: user.id, email: user.email };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN});
            return token;
        } catch (error) {
            console.log(error);
            return Error('Login failed');
        }
    }    
    async register(user) {
        try {
            const userExists = await UserModel.getByUsername(user.username);
            if (userExists) {
                console.log('User already exists');
                return null;
            }
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            user.salt = salt;
            await UserModel.createUser(user);
            return console.log('User created');
        } catch (error) {
            console.log(error);
            return null
        }
    }       
    async forgotPassword(email) {
        try {
            const user = await UserModel.getByEmail(email);
            console.log(user);
            if (!user) {
                console.log('User not found');
                return null;
            }
            const payload = { id: user.id, email: user.email };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN, algorithm: 'HS256' });
            user.resettoken = token;
            return console.log("token: ", token);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async resetPassword(token, password) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await UserModel.getByEmail(decoded.email);
            if (!user) {
                return { status: 404, message: 'User not found' };
            }
            if (decoded.exp <= Date.now()) {
                return { status: 400, message: 'Token expired' };
            }
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
            user.resettoken = null;
            await UserModel.updateUser(user.id, { password: user.password, salt: user.salt });
            return { status: 200, message: 'Password reset successful' };
        } catch (error) {
            console.error('Error resetting password:', error);
            return { status: 500, message: 'Internal server error' };
        }
    }
}    

export default new AuthService();