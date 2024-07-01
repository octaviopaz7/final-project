import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Importa Navigate desde react-router-dom

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true });
            await getUserInfo();
            return { success: true }; 
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Error durante el cierre de sesión:", error);
        }
    };

    const getUserInfo = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/getinfo', { withCredentials: true });
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            console.error("Error al obtener la información del usuario:", error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};




