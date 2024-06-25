
import { Col, Row, Container, Card } from 'react-bootstrap';
const AboutUsSection = () => {
    return (
        <section id="abtus" className='aboutUs-section d-flex align-items-center justify-content-center'>
            <Container>
                <Row>
                    <Col lg={6} sm={12} md={6}>
                        <Card className='card-aboutus'>
                            <Card.Img variant="top" src="https://assets-global.website-files.com/601d7e7320ecf079f58169fd/601dcd99b3d136acf7649f30_image-2-home-about-dentist-template.jpg" />
                        </Card>
                    </Col>
                    <Col lg={6} sm={12} md={6}>
                        <div>
                            <p>Sobre nosotros</p>
                            <h2 className='fs-1 fw-bold'>Nuestro equipo tiene una sola misión: hacerte sonreír</h2>
                            <p className='fw-normal fs-5'>
                                En el Centro Odontológico, nos dedicamos a proporcionar atención dental excepcional con un enfoque en tu comodidad y bienestar. Con años de experiencia y un equipo apasionado, garantizamos una sonrisa saludable y radiante, con tratamientos preventivos, restaurativos y cosméticos.
                            </p>


                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AboutUsSection