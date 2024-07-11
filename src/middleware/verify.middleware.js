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
const errorHandler = (err, req, res, next) => {
    console.log('ERROR LOG ', new Date().toLocaleString());
    console.log('Request:', req.method, req.originalUrl);
    console.log('Params:', req.params);
    console.log('Body:', req.body);
    console.log('Query:', req.query);
    console.log('Error:', err.messageObject || err.message);
    console.log('--------------------------------------------------------------------------------------');
  
    const messageError = err.messageObject || err.message;
    // create format error response
    const error = {
      status: err.status || 400,
      error: messageError
    };
    const status = err.status || 400;
  
    return res.status(status).json(error);
  };
export default errorHandler;