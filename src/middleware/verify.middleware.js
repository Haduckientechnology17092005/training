import jwt from 'jsonwebtoken';
export function verify(req, res, next) {
    let token = req.headers.authorization;
    console.log(token);
    if(!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    token = token.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'secretkey');
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'});
    }
}