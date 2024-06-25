import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Col, Form, Row } from 'react-bootstrap';
import CalendarForm from './CalendarForm';
import axios from 'axios';
import { useState } from 'react';

const AddForm = ({ fetchAppointments }) => {
    const { Formik } = formik;
    const [date, setDate] = useState(new Date());

    const schema = yup.object().shape({
        firstName: yup.string().required('Nombre es requerido'),
        lastName: yup.string().required('Apellido es requerido'),
        phone: yup.string().required('Teléfono es requerido'),
        appointmentType: yup.string().required('Tipo de consulta es requerido'),
        doctor: yup.string().required('Odontólogo es requerido')
    });

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={async (values, { resetForm }) => {
                    const appointmentData = { ...values, date };
                    try {
                        await axios.post('http://localhost:5000/api/appointments', appointmentData, { withCredentials: true });
                        resetForm();
                        fetchAppointments(); 
                    } catch (error) {
                        console.error('Error al agregar turno:', error);
                    }
                }}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    phone: '',
                    appointmentType: '',
                    doctor: ''
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className='form-row'>
                            <Col md="4" className='form-input-col'>
                                <Form.Group className="mb-3" controlId="validationFormik01">
                                    <Form.Label className="add-form-label">Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        isValid={touched.firstName && !errors.firstName}
                                    />
                                    <Form.Control.Feedback>Válido</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationFormik02">
                                    <Form.Label className="add-form-label">Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        isValid={touched.lastName && !errors.lastName}
                                    />
                                    <Form.Control.Feedback>Válido</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationFormik03">
                                    <Form.Label className="add-form-label">Teléfono</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        isInvalid={!!errors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationFormik04">
                                    <Form.Label className="add-form-label">Tipo de consulta</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="appointmentType"
                                        value={values.appointmentType}
                                        onChange={handleChange}
                                        isInvalid={!!errors.appointmentType}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.appointmentType}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationFormik05">
                                    <Form.Label className="add-form-label">Odontólogo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="doctor"
                                        value={values.doctor}
                                        onChange={handleChange}
                                        isInvalid={!!errors.doctor}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.doctor}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="4" className='form-calendar-col d-flex flex-column'>
                                <h5 className='add-form-label'>Seleccionar fecha</h5>
                                <CalendarForm date={date} setDate={setDate} />
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-center'>
                            <Button type="submit" className='btn-form-add mt-4'>Agregar</Button>
                        </Row>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default AddForm;

