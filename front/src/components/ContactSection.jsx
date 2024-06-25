import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                        <h3 className="contact-title">Contactanos para reservar tu primera consulta</h3>
                        <h4>Agenda el turno y horario más conveniente</h4>
                        <div className="d-flex">
                            <p>+54 381 347 8761</p>
                            <p>dentista@mail.com</p>
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
                                    className="w-75"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className="mb-4">
                                <Form.Label className="fw-medium fs-5">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-75"
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className="mb-4">
                                <Form.Label className="fw-medium fs-5">Servicio</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
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
    )
}

export default ContactSection
