import jwt from 'jsonwebtoken';
import UserModel from '../../models/user.model.js';
import bcrypt from 'bcrypt';
import authenticationService from '../../service/authentication.service.js';
class AuthService {
    constructor(){
        this.userModel = new UserModel();
    }
    async login(username, password) {
        try {
            const user = await this.userModel.getByUsername(username);
            console.log(user);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            console.log(isValidPassword);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            const payload = { id: user.id, username: user.username };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN, algorithm: 'HS256' });
            console.log(token);
            return res.status(200).json({ success: true, token: token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }    
    async register(user) {
        try {
            const userExists = await this.userModel.getByUsername(user.username);
            if (userExists) {
                return res.status(409).json({ message: 'User already exists' });
            }
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            user.salt = salt;
            await this.userModel.createUser(user);
            return res.status(201).json({ message: 'User created' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }       
}

export default new AuthService();