
import { FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'; // Importar los iconos correctos

const Icons = () => {
    return (
        <div className="iconos">
            <a href="https://www.instagram.com/tucuentadeinstagram" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="icon" />
                Instagram
            </a>
            <a href="https://twitter.com/tucuentadetwitter" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="icon" />
                Twitter
            </a>
            <a href="https://wa.me/tunumerodewhatsapp" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="icon" />
                WhatsApp
            </a>
           

        </div>
    );
};

export default Icons;
