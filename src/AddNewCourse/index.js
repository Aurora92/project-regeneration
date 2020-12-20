import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomNavbar from "../CustomNavbar";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect, setState, prevState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../api";
import Modal from "react-bootstrap/Modal";

const AddNewCourse = () => {
  const history = useHistory();
  const [price, setPrice] = useState({ normal: "", early_bird: "" });
  const [dates, setDates] = useState({ start_date: "", end_date: "" });
  const [instructors, setInstructors] = useState([]);
  const [instructorsInfo, setInstructorsInfo] = useState([]);
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
        id: newCourse.id,
        title: newCourse.title,
        imagePath: newCourse.imagePath,
        price: {
          normal: price.normal,
          early_bird: price.early_bird,
        },
        dates: {
          start_date: dates.start_date,
          end_date: dates.end_date,
        },
        duration: newCourse.duration,
        open: false,
        instructors: instructors,
        description: newCourse.description,
      })
      .then(function (response) {
        console.log(response);
        handleShow(true);


      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const handleChange = (event) => {
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });
    console.log(event.target.id);
  };

  const handleChangeOpen = (event) => {
    setNewCourse({ ...newCourse, [event.target.name]: event.target.checked });
  };

  const handleInstructors = (e) => {
    if (e.target.checked) {


      setInstructors(instructors.concat(e.target.value));
      console.log(instructors);
    }
  }

  const handleDates = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setDates({
      ...dates,

      [name]: value,
    });
  };

  const handlePrices = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPrice({
      ...price,

      [name]: value,
    });
  };

  useEffect(() => {
    const axios = require("axios");
    if (instructorsInfo.length === 0) {
      axios
        .get(`${API}/instructors`)
        .then(function (response) {
          // handle success

          setInstructorsInfo(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => history.push(`/courses`);
  const handleShow = () => setShow(true);


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

                <h3>Instructors</h3>
                {instructorsInfo.map((inst) => (
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      key={inst.key}
                      value={inst.id}
                      onChange={handleInstructors}
                      label={inst.name.first + " " + inst.name.last + " " + inst.id}
                    />
                  </Form.Group>
                ))}

                <hr />
                <Form.Group name="description" onChange={handleChange}>
                  <Form.Label>
                    <h3>Description</h3>
                  </Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <hr />
                <Form.Group onChange={handleDates}>
                  <Form.Label>
                    <h3>Dates</h3>
                  </Form.Label>
                  <h4>Start Date:</h4>
                  <Form.Control name="start_date" type="text" />

                  <h4>End Date:</h4>
                  <Form.Control name="end_date" type="text" />
                </Form.Group>
                <hr />
                <Form.Group onChange={handlePrices}>
                  <Form.Label>
                    <h3>Prices</h3>
                  </Form.Label>
                  <h4>Normal:</h4>
                  <Form.Control name="normal" type="text" />
                  <h4>Early Bird:</h4>
                  <Form.Control name="early_bird" type="text" />
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button onClick={handleAddCourse} variant="primary float-right">
                Add Course
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>A new course <strong>{newCourse.title}</strong> has been successfully added!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddNewCourse;
