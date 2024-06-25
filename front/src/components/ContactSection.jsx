import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <section id="contact" className="contact-section d-flex align-items-center justify-content-center">
            <Container>
                <Row>
                    <Col lg={6} sm={12} md={6}>
                        <div>

                            <h3 className="contact-title mb-3">¡Estamos aquí para ayudarte!</h3>
                            <p className="mb-3 fw-medium">Contáctanos para programar tu próxima consulta dental y resolver cualquier pregunta que puedas tener.</p>
                            <div className="d-flex align-items-center mb-3">
                                <FontAwesomeIcon icon={faPhone} className="me-2" />
                                <p className="mb-0 fw-semibold">+54 381 347 8761</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                                <p className="mb-0 fw-semibold">contacto@tudentista.com</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} sm={12} md={6}>
                        <Form onSubmit={handleSubmit} className="contact-form">
                            <Form.Group controlId="formBasicName" className="mb-4">
                                <Form.Label className="fw-medium fs-5">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ingrese su nombre"
                                    className="w-75"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className="mb-4">
                                <Form.Label className="fw-medium fs-5">Correo Electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Ingrese su correo electrónico"
                                    className="w-75"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicService" className="mb-4">
                                <Form.Label className="fw-medium fs-5">Servicio Requerido</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    placeholder="Especifique el servicio deseado"
                                    className="w-75"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicMessage" className="mb-4">
                                <Form.Label className="fw-medium fs-5">Mensaje</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Escriba su mensaje aquí"
                                    className="w-75"
                                />
                            </Form.Group>

                            <Button type="submit" className="btn btn-color w-75">
                                Enviar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
export default ContactSection;
