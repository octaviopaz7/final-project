
import { Container,Row,Col } from 'react-bootstrap';
import '../assets/css/FooterStyles.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
        <footer>
                <Container fluid className="footer">
                    <Row className="footer-cont">
                            <Col xs={12} md={4} lg={4} className='footer-col p-0 d-flex flex-column justify-content-center align-items-center'>
                                <ul className='footer-nav d-flex flex-column align-items-end'>
                                    <li className='footer-item'><Link to={"/menu"}>Inicio</Link></li>
                                    <li className='footer-item'><Link to={"/aboutus"}>Servicios</Link></li>
                                    <li className='footer-item'><Link to={"/contact"}>Turnos</Link></li>
                                    <li className='footer-item'><Link to={"/contact"}>Contactos</Link></li>

                                </ul>
                            </Col>
                            <Col xs={12} md={4} lg={4} className='footer-col p-0 d-flex flex-column justify-content-center align-items-center'>
                                <h3>Logo</h3>
                                <p className="text-muted">© {new Date().getFullYear()} Logo</p>
                            </Col>
                            <Col xs={12} md={4} lg={4} className='footer-col p-0 d-flex justify-content-center'>
                                <ul className='footer-nav footer-media-wrap d-flex p-0'>
                                    {/* <li className='footer-media'><FontAwesomeIcon icon={faInstagram} /><span className='media-text'> </span></li>
                                    <li className='footer-media'><FontAwesomeIcon icon={faXTwitter} /><span className='media-text'> </span></li> */}
                                </ul>
                            </Col>
                    </Row>
                </Container>
            </footer>
    )
}

export default Footer
