import { Container, Row, Col, Card } from 'react-bootstrap'
const servicios = [
    {
        titulo: 'Ortodoncia',
        descripcion: 'Tratamientos para alinear los dientes y corregir la mordida.',
        imagen: 'https://assets-global.website-files.com/601d7e7320ecf0fa9e816a33/601def4a7b7d528765398735_image-6-blog-dentist-template-p-2000.jpeg', 
    },
    {
        titulo: 'Blanqueamiento dental',
        descripcion: 'Procedimientos para mejorar el color de los dientes.',
        imagen: 'https://assets-global.website-files.com/601d7e7320ecf0fa9e816a33/601def0b261d9f227a3d2f59_image-5-blog-dentist-template-p-800.jpeg',
    },
    {
        titulo: 'Implantes dentales',
        descripcion: 'Restauración de dientes perdidos mediante implantes de titanio.',
        imagen: 'https://assets-global.website-files.com/601d7e7320ecf0fa9e816a33/601deeec10c1a30a672b7178_image-4-blog-dentist-template-p-500.jpeg', 
    }
]
const ServicesSection = () => {
    return (
        <section id="services" className="services-section d-flex align-items-center justify-content-center">
            <Container>
                <h2 className="mt-4 mb-3 font-color fs-1 fw-bold text-center">Nuestros Servicios</h2>
                <p className='subtitle-service-section fw-semibold fs-4 text-center'>Descubre cómo nuestros servicios pueden mejorar tu salud dental.</p>
                <Row xs={1} md={3} className="g-4">
                    {servicios.map((servicio, index) => (
                        <Col key={index}>
                            <Card className='card-service-home'>
                                <Card.Img variant="top" src={servicio.imagen} />
                                <Card.Body className='font-color'>
                                    <Card.Title className='fw-bold'>{servicio.titulo}</Card.Title>
                                    <Card.Text  className='fw-medium'>{servicio.descripcion}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default ServicesSection
