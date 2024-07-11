import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
class authenticationService {
    constructor() {
        this.JWT_SECRET = 'secretkey';
    }
    async login(username) {
        const token = jwt.sign({id:user.ID}, this.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
        return token;
    }
    verify(token) {
        return jwt.verify(token, this.JWT_SECRET);
    }
    asSignedUserRequestContext(user, req) {
        req.user = user;
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
}

export default new authenticationService();