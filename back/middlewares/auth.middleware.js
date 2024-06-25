import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json("Debes iniciar sesión");

    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) return res.status(401).json("Token inválido");

        req.user = decoded; 
        next();
    });
};


