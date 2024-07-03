import AuthService from './auth.service.js';
import userService from '../users/user.service.js';
import { async } from 'regenerator-runtime';
class AuthController {
    login = async (req, res, next) =>{
        try {
            const { username, password } = req.body;
            const token = await AuthService.login(username, password);
            
            if (token === null) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    register = async (req, res, next) => {
        try {
            let newUser = {
                name: req.body.name,
                gender: req.body.gender,
                age: req.body.age,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            };
            await userService.createUser(newUser);
            return res.status(201).json({ message: 'User created' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }; 

    // forgotPassword = async (req, ré, next) => {
    //     const {email} = req.body;
    //     const token = await AuthService.forgotPassword(email);
    //     if(token==null){
    //         return res.status(401).json({message: 'Invalid credentials'});
    //     }const a = async () => {
    //         try{
    //                 const conn = await connection.getConnection()
    //                 const [rows, fields] = await connection.execute('SELECT * FROM users');
    //                 connection.releaseConnection(conn)
    //                 console.log(rows)
    //                 return rows;
    //             } catch(error){
    //                 console.log(error);
    //                 throw new Error(error);
    //             }
    //     }
        
    //     a()
    //     return res.status(200).json({token});
    // }

    // resetPassword = async (req, res, next) => {
    //     const {token, newPassword} = req.body;
    //     const user = await AuthService.resetPassword(token, newPassword);
    //     if(user==null){
    //         return res.status(401).json({message: 'Invalid credentials'});
    //     }
    //     return res.status(200).json({token});
    // }
}
export default new AuthController();