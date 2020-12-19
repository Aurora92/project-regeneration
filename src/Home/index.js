import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import MainHeader from "./MainHeader";
import FetchingStats from "./FetchingsStats";
import CoursesTable from "./CoursesTable";
import CustomNavbar from "../CustomNavbar";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <Container fluid>
    <Row>
        <Col>
          <CustomNavbar/>
        </Col>
      </Row>
      <Row className=" mt-5 ">
        <Col>
          <MainHeader />
        </Col>
      </Row>

      <FetchingStats />

      <Card className="mx-auto my-5">
        <Card.Header>Last 5 courses</Card.Header>
        <CoursesTable />
        <Card.Footer className="text-muted text-right">
        <Button variant="primary"><Link to="/courses" style={{
                                textDecoration: "none", color: "white"
                            }}>View All</Link></Button>
        </Card.Footer>
      </Card>

    </Container>
  )
};

export default Home;