import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AppointmentsContext = createContext();

export const useAppointments = () => {
  return useContext(AppointmentsContext);
};

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const { token } = useAuth();

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/appointments/${appointmentId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 204 || response.status === 200) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
      } else {
        throw new Error("Error al eliminar la cita");
      }
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
  };
  useEffect(() => {
    fetchAppointments();
}, []);

  return (
    <AppointmentsContext.Provider
      value={{ appointments, fetchAppointments, deleteAppointment }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};
