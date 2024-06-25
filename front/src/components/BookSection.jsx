import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const phone = '+543813846942';
const whatsappMessage = 'Hola! Me comunico desde su página web y me gustaría *reservar un turno*';

const BookSection = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <section id="appointment">
            <Container>
                <Row>
                    <Col>
                        <Card className="book-card">
                            <div className="row g-0">
                                <div className="col-md-6">
                                    <Card.Img
                                        src="https://assets-global.website-files.com/601d7e7320ecf079f58169fd/601dd1ea6aaa3e164016ddd1_image-cta-dentist-template-p-800.jpeg"
                                        className="img-fluid"
                                        alt="Imagen de un dentista"
                                    />
                                </div>
                                <div className="col-md-6 d-flex flex-column justify-content-center">
                                    <Card.Body className="text-center">
                                        <Card.Title className="fs-1 fw-bold">Agendá un turno hoy mismo</Card.Title>
                                        <Card.Text className="fw-medium fs-4 text-color">
                                            ¡Tu sonrisa merece lo mejor! Descubre un cuidado dental excepcional y personalizado que transformará tu salud bucodental.
                                        </Card.Text>
                                        <Button
                                            className="btn-book fw-bold fs-5 w-50"
                                            href={whatsappUrl}
                                            target="_blank"
                                        >
                                            Reservar
                                        </Button>
                                    </Card.Body>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default BookSection;

