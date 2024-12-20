
import '../assets/css/IntroHomeStyles.css';
import video from '../assets/video/video5.mp4';
import {Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
const phone = '+543815408251';
const whatsappMessage = 'Hola! Me comunico desde su página web y me gustaría *reservar un turno*';

const IntroHome = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(whatsappMessage)}`;
    return (
        <section className='intro-container'>
            <video autoPlay loop muted playsInline src={video} preload="metadata"></video>
            <div className='intro-text-wrap'>
                <h1 className='intro-title'>Consultorio Odontológico</h1>
                <p className='intro-subtitle'>Agendá un turno enviando un mensaje a +54 9 3815408251</p>
                <Button className="btn-intro fw-bold fs-5"
                 href={whatsappUrl}
                 target="_blank"
                  >
                    <FontAwesomeIcon icon={faCalendar} />  Agendar un turno
                   </Button>
            </div>
        </section>
    );
}

export default IntroHome;
