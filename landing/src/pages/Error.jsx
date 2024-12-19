import img from "../assets/img/404img.png";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <section className="error-section d-flex align-items-center justify-content-center flex-column py-5">
      <h1 className="error-title">
        Oops! Parece que te has perdido en nuestra sonrisa
      </h1>
      <h4 className="error-text">
        La página que buscas no existe, pero estamos aquí para ayudarte a
        encontrar lo que necesitas. <br /> ¿Por qué no exploras nuestros
        servicios odontológicos mientras tanto?
      </h4>
      <Link to="/" className="btn basic-btn w-10 m-4">
        Volver a Inicio
      </Link>
      <img src={img} width={800} />
    </section>
  );
};

export default Error;
