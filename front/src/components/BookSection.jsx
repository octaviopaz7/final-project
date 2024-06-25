import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const phone = '+543813846942'; 
const whatsappMessage = 'Hola! me comunico desde su página web y me gustaría *reservar un turno* ';


const BookSection = () => {
    return (
        <section id="appointment">
            <Container>
                <Row>
                    <Col>
                        <Card className="book-card">
                            <div className="row g-0">
                                <div className="col-md-6 d-flex flex-column justify-content-center">
                                    <div className="card-body">
                                        <h5 className="card-title fs-1 fw-bold">Agendá un turno hoy</h5>
                                        <p className="card-text fw-medium fs-3 text-color">
                                            ¡Tu sonrisa merece lo mejor! Reserva tu cita ahora y descubre el cuidado dental excepcional que tenemos para ti.
                                        </p>
                                        <Button
                                            className="btn-book fw-bold fs-5 w-50"
                                            href={`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(whatsappMessage)}`}
                                            target="_blank"
                                        >
                                            Reservar
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <img
                                        src="https://assets-global.website-files.com/601d7e7320ecf079f58169fd/601dd1ea6aaa3e164016ddd1_image-cta-dentist-template-p-800.jpeg"
                                        className="img-fluid"
                                        alt="Dentist"
                                    />
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
