import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
class authenticationService {
    constructor() {
        this.JWT_SECRET = 'secretkey';
    }
    async login(username) {
        const token = jwt.sign({id:user.ID}, this.JWT_SECRET, { expiresIn: '5m', algorithm: 'HS256' });
        return token;
    }
    verify(token) {
        return jwt.verify(token, this.JWT_SECRET);
    }
    asSignedUserRequestContext(user, req) {
        req.user = user;
    }
}

export default authenticationService;