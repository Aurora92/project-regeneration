import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomNavbar from "../CustomNavbar";



const AddNewCourse = () => {
  return (
    <Container fluid>
    <Row>
        <Col>
          <CustomNavbar/>
        </Col>
      </Row>
      <Row className=" mt-5 ">
        <Col>
          <h1>add</h1>
        </Col>
      </Row>

      
    </Container>
  )
};

export default AddNewCourse;