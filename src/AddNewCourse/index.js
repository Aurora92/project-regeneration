import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomNavbar from "../CustomNavbar";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect, setState, prevState } from "react";
import { API } from "../api";

const AddNewCourse = () => {
  let last_id = 4;
const [newCourse, setNewCourse] = useState({
  id:"05",
  title: "gfdg",
  imagePath: "",
  price: {
    normal: 0,
    early_bird: 0,
  },
  dates: {
    start_date: "",
    end_date: "",
  },
  duration: "",
  open: true,
  instructors: [],
  description: "",
});
 const handleAddCourse = (e) => {
    const axios = require("axios");

    axios
      .post(`${API}/courses/`, {
       newCourse,
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  return (
    <Container fluid>
      <Row>
        <Col>
          <CustomNavbar />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="my-5">
            <Card.Body>
              <Card.Header>
                <h2>Add New Course</h2>
              </Card.Header>
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>
                    <h3>Title</h3>
                  </Form.Label>
                  <Form.Control type="text" name="title" />
                  <Form.Label>
                    <h3>Duration</h3>
                  </Form.Label>
                  <Form.Control name="duration" type="text" />
                  <Form.Label>
                    <h3>Image Path</h3>
                  </Form.Label>
                  <Form.Control type="text" name="imagePath" />
                  <h5>
                    <Form.Check
                      type="checkbox"
                      id="default-checkbox"
                      label="Bookable"
                      name="open"
                    />
                  </h5>
                  <hr />
                </Form.Group>

                <hr />
                <Form.Label>
                  <h3>Description</h3>
                </Form.Label>
                <Form.Control as="textarea" rows={3} />
                <hr />
                <Form.Label>
                  <h3>Dates</h3>
                </Form.Label>
                <h4>Start Date:</h4>
                <Form.Control type="text" />
                <h4>End Date:</h4>
                <Form.Control type="text" />
                <hr />
                <Form.Label>
                  <h3>Prices</h3>
                </Form.Label>
                <h4>Normal:</h4>
                <Form.Control type="text" />
                <h4>Early Bird:</h4>
                <Form.Control type="text" />
              </Form>
            </Card.Body>
            <Card.Footer>
             
              <Button variant="primary" onClick={handleAddCourse}>Add new course</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewCourse;