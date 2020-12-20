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
  let last_id = 5;
  const [newCourse, setNewCourse] = useState({
    id: "",
    title: "",
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
    open: false,
    instructors: [],
    description: "",
  });
  const handleAddCourse = (e) => {
    const axios = require("axios");

    axios
      .post(`${API}/courses/`, {
        id: "09",
        title: newCourse.title,
        imagePath: newCourse.imagePath,
        price: {
          normal: 0,
          early_bird: 0,
        },
        dates: {
          start_date: "",
          end_date: "",
        },
        duration: newCourse.duration,
        open: false,
        instructors: [],
        description: newCourse.description,
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    last_id = last_id + 1;
  };

   const handleChange = (event) => {
     setNewCourse({ ...newCourse, [event.target.name]: event.target.value });
     console.log(event.target.id);
   };

   const handleChangeOpen = (event) => {
     setNewCourse({ ...newCourse, [event.target.name]: event.target.checked });
   };
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
                <Form.Group name="title" onChange={handleChange}>
                  <Form.Label>
                    <h3>Title</h3>
                  </Form.Label>
                  <Form.Control type="text" name="title" />
                </Form.Group>
                <Form.Group name="duration" onChange={handleChange}>
                  <Form.Label>
                    <h3>Duration</h3>
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group name="imagePath" onChange={handleChange}>
                  <Form.Label>
                    <h3>Image Path</h3>
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group name="open" onChange={handleChangeOpen}>
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
                <Form.Group name="description" onChange={handleChange}>
                  <Form.Label>
                    <h3>Description</h3>
                  </Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <hr />
                <Form.Group>
                  <Form.Label>
                    <h3>Dates</h3>
                  </Form.Label>
                  <h4>Start Date:</h4>
                  <Form.Control type="text" />
                </Form.Group>
                <h4>End Date:</h4>
                <Form.Control type="text" />
                <hr />
                <Form.Group>
                  <Form.Label>
                    <h3>Prices</h3>
                  </Form.Label>
                  <h4>Normal:</h4>
                  <Form.Control type="text" />
                  <h4>Early Bird:</h4>
                  <Form.Control type="text" />
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" onClick={handleAddCourse}>
                Add new course
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewCourse;
