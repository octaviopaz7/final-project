import * as usersService from '../services/user.service.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const createToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
        SECRET_KEY,
        { expiresIn: "1h" }
    );
};

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: "Debe completar todos los campos" });
        }

        const existingUser = await usersService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "El correo electrónico ya está registrado" });
        }

        const hashedPassword = await usersService.hashPassword(password);
        const newUser = await usersService.createUser({ firstName, lastName, email, password: hashedPassword });

        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error al registrar usuario", error: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersService.getUserByEmail(email);
        if (!user) return res.status(400).json({ message: "No hay una cuenta asociada a ese correo electronico. Intente nuevamente" });

        const validPassword = await usersService.comparePassword(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Contraseña incorrecta" });

        const token = createToken(user);
        res.cookie("token", token, { httpOnly: true });
        console.log(token)
        res.status(201).json({ message: "Usuario loggeado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión. Intente nuevamente" });
    }
};



export const logout = (req, res) => {
    res.clearCookie("token", { path: '/' });
    res.status(200).json("Se cerró la sesión correctamente");
};

export const getUserInfo = (req, res) => {
    res.status(200).json(req.user);
};
