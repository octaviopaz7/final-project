import * as yup from "yup";

export const appointmentSchema = yup.object().shape({
 name: yup
     .string()
     .matches(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/, "El nombre solo puede contener letras")
     .required("Nombre es requerido"),
     phone: yup
     .string()
     .matches(
       /^\d{2,3}9\d{2,4}\d{6,8}$/,
       "Formato correcto: código país + 9 + código área + número (sin 0 ni 15). Ejemplo: 5493814752316"
     )
     .required("Teléfono es requerido"),
     appointmentType: yup.string().required("Tipo de consulta es requerido"),
     date: yup
     .date()
     .required("Fecha de cita es requerida")
     .nullable(),  
     hour: yup
     .string()
     .required("Hora es requerida"),
});


export default appointmentSchema;
