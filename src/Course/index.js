
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomNavbar from '../CustomNavbar';
import { API } from '../api';
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useState, useEffect, setState, prevState } from "react";



const Course = () => {
  let { id } = useParams();
  const [course, setCourse] = useState([]);
  const [prices, setPrices] = useState([]);
  const [dates, setDates] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [instructorsInfo, setInstructorsInfo] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [updateCourse, setUpdateCourse] = useState({
    id: course.id,
    title: course.title,
    imagePath: course.imagePath,
    price: {
      normal: prices.normal,
      early_bird: prices.early_bird,
    },
    dates: {
      start_date: dates.start_date,
      end_date: dates.end_date,
    },
    duration: course.duration,
    open: true,
    instructors: instructorsInfo,
    description: course.description,
  });

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleShowDelete = () => setShowDelete(true);

  const handleEditCourse = () => {
    const axios = require("axios");

    axios
      .put(`${API}/courses/${id}`, {
        updateCourse,
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const handleDeleteCourse = () => {
    const axios = require("axios");

    axios.delete(`${API}/courses/${id}`);
  };

  const handleUpdate = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdateCourse({
      ...updateCourse,
      [name]: value,
    });

    console.log(updateCourse);
  };

  const ckboxHandle = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    setUpdateCourse({
      ...updateCourse,
      [name]: value,
    });

    console.log(updateCourse);
  };

  const instrHandle = (e) => {
    if (e.target.checked) {
      handleUpdate(e);
    } else {
    }
  };

  const handleDateUpdate = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdateCourse({
      ...updateCourse,
      dates: {
        [name]: value,
      },
    });
  };

  const axios = require("axios");
  useEffect(() => {
    if (course.length === 0) {
      axios
        .get(`${API}/courses/${id}`)
        .then(function(response) {
          // handle success

          setCourse(response.data);
          setPrices(response.data.price);
          setDates(response.data.dates);
          setInstructors(response.data.instructors);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    }
  }, []);

  useEffect(() => {
    if (instructorsInfo.length === 0) {
      instructors.forEach((instructor) => {
        axios
          .get(`${API}/instructors/` + instructor)
          .then(function(response) {
            // handle success
            setInstructorsInfo(instructorsInfo.concat(response.data));
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          })
          .then(function() {
            // always executed
          });
      });
    }
  });

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <CustomNavbar />
        </Col>
      </Row>
      {/* ----------------------------------COURSE INFO----------------------- */}
      <Row>
        <Col>
          <h1 className="mt-5">{course.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={course.imagePath} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Price: {prices.normal} €</h3>
        </Col>
        <Col>
          <h3>Duration: {course.duration}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>
            Bookable:
            {course.open && (
              <svg
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                className="bi bi-check"
                fill="green"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                />
              </svg>
            )}
          </h3>
        </Col>
        <Col>
          <h3>
            Dates:{" "}
            <strong>
              {new Date(dates.start_date).toLocaleDateString("en-GB")} -{" "}
              {new Date(dates.end_date).toLocaleDateString("en-GB")}
            </strong>{" "}
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          <div dangerouslySetInnerHTML={{ __html: course.description }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleShowEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleShowDelete}>
            Delete
          </Button>
          {/* ----------------------------------EDIT COURSE FORM----------------------- */}
          <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Course: {course.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder={course.title}
                    onChange={handleUpdate}
                  />
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    name="duration"
                    type="text"
                    placeholder={course.duration}
                    onChange={handleUpdate}
                  />
                  <Form.Label>Image Path</Form.Label>
                  <Form.Control
                    type="text"
                    name="imagePath"
                    placeholder={course.imagePath}
                    onChange={handleUpdate}
                  />
                  <Form.Check
                    type="checkbox"
                    id="default-checkbox"
                    label="Bookable"
                    name="open"
                    onChange={ckboxHandle}
                  />
                  <hr />
                </Form.Group>
                {instructorsInfo.map((instr) => (
                  <Form.Check
                    type="checkbox"
                    id="default-checkbox"
                    value={instr.id}
                    label={instr.name.first + " " + instr.name.last}
                    onChange={instrHandle}
                  />
                ))}
                <hr />
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={course.description}
                  name="description"
                  onChange={handleUpdate}
                />
                <hr />
                <Form.Label>Dates</Form.Label>
                <h4>Start Date:</h4>
                <Form.Control
                  type="text"
                  name="start_date"
                  onChange={handleDateUpdate}
                  placeholder={dates.start_date}
                />
                <h4>End Date:</h4>
                <Form.Control
                  type="text"
                  name="end_date"
                  onChange={handleDateUpdate}
                  placeholder={dates.end_date}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEditCourse}>
                Save Changes
              </Button>
            </Modal.Footer>
            {/* ----------------------------------DELETE COURSE--------------------------- */}
          </Modal>
          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Course: {course.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete {course.title}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteCourse}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      {/* ----------------------------------INSTRUCTORS INFO----------------------- */}
      <Row>
        <Col>
          <h3>Instructors</h3>
          {instructorsInfo.map((instr) => (
            <Row>
              <Col>
                <h2>
                  {instr.name.first +
                    " " +
                    instr.name.last +
                    "(" +
                    instr.dob +
                    ")"}
                </h2>
                <h5>
                  E-mail: {instr.email} | LinkedIn: {instr.linkedin}
                </h5>
                <h5>{instr.bio}</h5>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Course;
