import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AppointmentsContext = createContext();

export const useAppointments = () => {
    return useContext(AppointmentsContext);
};

export const AppointmentsProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const { token } = useAuth();

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/appointments', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAppointments();
        }
    }, [token]);

    return (
        <AppointmentsContext.Provider value={{ appointments, fetchAppointments }}>
            {children}
        </AppointmentsContext.Provider>
    );
};

