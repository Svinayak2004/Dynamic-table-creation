import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    
    if(!token){
        res.status(400);
        throw new Error("user is not athonticated , token missing");
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
}

export default authMiddleware;