import { Col, Row, Container, Card } from 'react-bootstrap';

const AboutUsSection = () => {
    return (
        <section id="abtus" className='aboutUs-section d-flex align-items-center justify-content-center'>
            <Container>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <div className="aboutus-content">
                            <p className='text-start mb-0 section-title'>SOBRE NOSOTROS</p>
                            <h2 className='fs-2 fw-bold text-start mt-3'>Tu sonrisa es nuestra prioridad</h2>
                            <p className='fs-5 text-start'>
                                En el Centro Odontológico, nos dedicamos a proporcionar una atención dental excepcional. Nuestro equipo altamente capacitado está comprometido con tu bienestar y comodidad, ofreciendo tratamientos preventivos, restaurativos y cosméticos para asegurar una sonrisa saludable y radiante.
                            </p>
                            <p className='text-start text-abtus fs-5 pt-2'>
                                Descubre cómo podemos ayudarte a mejorar tu salud dental hoy mismo.
                            </p>
                        </div>
                    </Col>
                    <Col lg={6} md={6} sm={12} className='d-flex justify-content-center align-items-center'>
                        <Card className='card-aboutus'>
                            <Card.Img variant="top" src="https://assets-global.website-files.com/601d7e7320ecf079f58169fd/601dcd99b3d136acf7649f30_image-2-home-about-dentist-template.jpg" alt="Imagen sobre nosotros" />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default AboutUsSection;
