import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomNavbar from '../CustomNavbar';
import { API } from '../api';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CardColumns } from "react-bootstrap";

const Courses = () => {

    const [coursesCards, setCoursesCards] = useState([]);
    const axios = require("axios");
    useEffect(() => {

        axios
            .get(`${API}/courses`)
            .then(function (response) {
                // handle success

                setCoursesCards(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }, [coursesCards.length]);

    return (

        <Container fluid>
            <Row className="my-5">
                <Col>
                    <CustomNavbar />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>All Courses</h1>
                </Col>

            </Row>
            <Row>


                {coursesCards.map((course) => (
                    <Card key={course.id} className="p-3" style={{ width: "30%", margin: "1.5%" }}>
                        <Card.Header>
                            <Card.Title>{course.title}</Card.Title>
                        </Card.Header>
                        <Card.Img variant="top" src={course.imagePath} />
                        <Card.Body>
                            <Card.Text>
                                <p>Price: <strong>{course.price.normal}€</strong> | Bookable:{course.open ? (
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
                                ) :
                                    <svg
                                        width="2em"
                                        height="2em"
                                        viewBox="0 0 16 16"
                                        className="bi bi-check"
                                        fill="red"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                }
                                </p>
                                <p>Duration: <strong>{course.duration}</strong> </p>
                                <p>Dates: <strong>{new Date(course.dates.start_date).toLocaleDateString('en-GB')} - {new Date(course.dates.end_date).toLocaleDateString('en-GB')}</strong> </p>




                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary float-right"><Link to={`/courses/${course.id}`} style={{
                                textDecoration: "none", color: "white"
                            }}>View</Link></Button>
                        </Card.Footer>
                    </Card>

                ))}



            </Row>
        </Container>



    );
};

export default Courses;

