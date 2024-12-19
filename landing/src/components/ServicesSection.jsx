import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const servicios = [
    {
        titulo: 'Ortodoncia',
        descripcion: 'Tratamientos para alinear los dientes y corregir problemas de mordida mediante aparatos como brackets y alineadores.',
        imagen: 'https://assets-global.website-files.com/601d7e7320ecf0fa9e816a33/601def4a7b7d528765398735_image-6-blog-dentist-template-p-2000.jpeg',
    },
    {
        titulo: 'Blanqueamiento dental',
        descripcion: 'Procedimientos estéticos para mejorar el color de los dientes, eliminando manchas y decoloraciones.',
        imagen: 'https://assets-global.website-files.com/601d7e7320ecf0fa9e816a33/601def0b261d9f227a3d2f59_image-5-blog-dentist-template-p-800.jpeg',
    },
    {
        titulo: 'Implantes dentales',
        descripcion: 'Procedimientos para reemplazar dientes perdidos mediante la colocación de implantes de titanio que se integran con el hueso dental.',
        imagen: 'https://assets-global.website-files.com/601d7e7320ecf0fa9e816a33/601deeec10c1a30a672b7178_image-4-blog-dentist-template-p-500.jpeg',
    }
];

const ServicesSection = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 992);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="services" className="services-section d-flex align-items-center justify-content-center flex-column">
            <span className="section-title">TRATAMIENTOS</span>
            <h2 className="mt-4 mb-3 font-color fs-1 fw-bold text-center">Nuestros Servicios</h2>
            <p className="subtitle-service-section fw-semibold fs-4 text-center">Descubre cómo nuestros servicios pueden mejorar tu salud dental.</p>
            <div className="services-container">
                <Container>
                    <Row xs={1} md={3} className="g-4">
                        {servicios.map((servicio, index) => (
                            <Col key={index}>
                                {isLargeScreen ? (
                                    <div
                                        className="card-large"
                                        style={{
                                            backgroundImage: `url(${servicio.imagen})`,
                                        }}
                                    >
                                        <div className="card-content">
                                            <h2 className="card-title">{servicio.titulo}</h2>
                                            <p className="card-body">{servicio.descripcion}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <Card className="card-service-home">
                                        <Card.Img variant="top" src={servicio.imagen} />
                                        <Card.Body className="font-color">
                                            <Card.Title className="fw-bold">{servicio.titulo}</Card.Title>
                                            <Card.Text className="fw-medium">{servicio.descripcion}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                )}
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </section>
    );
};

export default ServicesSection;
