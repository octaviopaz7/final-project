import ContactTable from "../components/ContactTable";
import {Row} from "react-bootstrap"
const Contact = () => {
  return (
    <>
      <section className="container contact-section d-flex flex-column align-items-center justify-content-center">
        <Row className="w-100">
          <ContactTable />
        </Row>
      </section>
    </>
  );
};

export default Contact;
