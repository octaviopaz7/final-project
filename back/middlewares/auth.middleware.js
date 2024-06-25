import jwt from 'jsonwebtoken';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY

export const autenticarToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json("Debes iniciar sesión");

    jwt.verify(token, SECRET_KEY, (error, verified) => {
        if (error){
            return res.status(401).json("Error al autenticar token");
        } 
        req.user = verified;
        next();
    });
};
