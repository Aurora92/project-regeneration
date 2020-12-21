import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomNavbar from "../CustomNavbar";
import { API } from "../api";
import Button from "react-bootstrap/Button";
import { Link, useParams, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useState, useEffect, setState, prevState } from "react";

const Course = () => {
  let { id } = useParams();
  const history = useHistory();
  const [course, setCourse] = useState([]);
  const [price, setPrice] = useState([]);
  const [dates, setDates] = useState([]);
  const [open, setOpen] = useState(true);
  const [instructors, setInstructors] = useState([]);
  const [instructorsInfo, setInstructorsInfo] = useState([]);
  const [selected, setSelected] = useState([]);
 
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [updateCourse, setUpdateCourse] = useState({
    id: course.id,
    title: course.title,
    imagePath: course.imagePath,
    price: {
      normal: price.normal,
      early_bird: price.early_bird,
    },
    dates: {
      start_date: dates.start_date,
      end_date: dates.end_date,
    },
    duration: course.duration,
    open: course.open,
    instructors: course.instructors,
    description: course.description,
  });

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleShowDelete = () => setShowDelete(true);

  const handleEditCourse = (e) => {
    const axios = require("axios");

    axios
      .put(`${API}/courses/${id}`, {
        id: course.id,
        title: course.title,
        imagePath: course.imagePath,
        price: {
          normal: price.normal,
          early_bird: price.early_bird,
        },
        dates: {
          start_date: dates.start_date,
          end_date: dates.end_date,
        },
        duration: course.duration,
        open: course.open,
        instructors: selected,
        description: course.description,
      })
      .then(function(response) {
        console.log(response);
        handleCloseEdit();
      })
      .catch(function(error) {
        console.log(error);
      });
    e.preventDefault();
    window.location.reload(false);
  };

  const handleDeleteCourse = () => {
    const axios = require("axios");

    axios.delete(`${API}/courses/${id}`);
    history.push("/courses");
  };

  const handleUpdate = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCourse({
      ...course,
      [name]: value,
      price: {
        normal: price.normal,
        early_bird: price.early_bird,
      },
    });

 
  };

 const ckboxHandle = (e) => {
  
   let name = e.target.name;
   let value = e.target.checked;
   setCourse({
     ...course,
     [name]: value,
   });
 };
  
  const handleInstructors = (e) => {
    
    if (e.target.checked) {
     
      setSelected(selected.concat(e.target.value));
      
      
    } else {
      
      var i = selected.indexOf(e.target.value);
      setSelected(selected.splice(i,1));
    }
   
  };

  const handleDateUpdate = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setDates({
      ...dates,

      [name]: value,
    });
  };

  const handlePriceUpdate = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPrice({
      ...price,

      [name]: value,
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
          setPrice(response.data.price);
          setDates(response.data.dates);
          setInstructors(response.data.instructors);
          
          
          setUpdateCourse(response.data);
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
    axios
      .get(`${API}/instructors`)
      .then(function(response) {
        // handle success
        setInstructorsInfo(response.data);

      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }, []);

  

  return (
    <Container fluid>
      <Row className="my-5">
        <Col>
          <CustomNavbar />
        </Col>
      </Row>
      {/* ----------------------------------COURSE INFO----------------------- */}
      <Row>
        <Col>
          <h1>{updateCourse.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            src={updateCourse.imagePath}
            style={{ width: "100%", height: "300px" }}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h3>Price: {updateCourse.price.normal} €</h3>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <h3>Duration: {updateCourse.duration}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>
            Bookable:
            {updateCourse.open ? (
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
            ) : (
              <svg
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                className="bi bi-check"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            )}
          </h3>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <h3>
            Dates:{" "}
            <strong>
              {new Date(updateCourse.dates.start_date).toLocaleDateString(
                "en-GB"
              )}{" "}
              -{" "}
              {new Date(updateCourse.dates.end_date).toLocaleDateString(
                "en-GB"
              )}
            </strong>{" "}
          </h3>
        </Col>
      </Row>
      <Row>
        <Col className="mt-5">
          {" "}
          <div
            dangerouslySetInnerHTML={{ __html: updateCourse.description }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleShowEdit}>
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={handleShowDelete}
            style={{ marginLeft: "5px" }}
          >
            Delete
          </Button>
          {/* ----------------------------------EDIT COURSE FORM----------------------- */}
          <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Course: {updateCourse.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleEditCourse}>
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
                    checked={course.open}
                    onChange={ckboxHandle}
                  />
                  <hr />
                </Form.Group>

                <Form.Label>Instructors</Form.Label>
                {instructorsInfo.map((inst) => (
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      key={inst.id}
                      value={inst.id}
                      label={inst.name.first + " " + inst.name.last}
                      onChange={handleInstructors}
                    />
                  </Form.Group>
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
                <h5>Start Date:</h5>
                <Form.Control
                  type="text"
                  name="start_date"
                  onChange={handleDateUpdate}
                  placeholder={dates.start_date}
                />
                <h5>End Date:</h5>
                <Form.Control
                  type="text"
                  name="end_date"
                  onChange={handleDateUpdate}
                  placeholder={dates.end_date}
                />
                <hr />
                <Form.Label>Prices</Form.Label>
                <h5>Normal:</h5>
                <Form.Control
                  type="text"
                  name="normal"
                  onChange={handlePriceUpdate}
                  placeholder={price.normal}
                />
                <h5>Early Bird:</h5>
                <Form.Control
                  type="text"
                  name="early_bird"
                  onChange={handlePriceUpdate}
                  placeholder={price.early_bird}
                />
                <Button variant="secondary" onClick={handleCloseEdit}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>

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
          <h2>Instructors</h2>
          <ul>
            {instructorsInfo.map(
              (instr) =>
                instructors.includes(instr.id) && (
                  <div key={instr.id}>
                    <h3>
                      {instr.name.first +
                        " " +
                        instr.name.last +
                        " (" +
                        instr.dob +
                        ")"}
                    </h3>
                    <p>
                      E-mail: <a href="">{instr.email} </a>|{" "}
                      <a href={`${instr.linkedin}`} target="_blank">
                        LinkedIn
                      </a>
                    </p>
                    <p>{instr.bio}</p>
                  </div>
                )
            )}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Course;
