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
import { Link, useParams} from "react-router-dom";



const Course = () => {
    
    let { id } = useParams();
    const [course, setCourse] = useState([]);
    const axios = require("axios");
    useEffect(() => {
        if (course.length === 0) {
            axios
                .get(`${API}/courses/${id}`)
                .then(function (response) {
                    // handle success

                    setCourse(response.data);
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

    console.log(id);
    

    return (

        <Container fluid>
            <Row >
                <Col>
                    <CustomNavbar />
                </Col>
            </Row>
            <Row>

                <h1 > Course</h1>

            </Row>
            <Row>
                <Col>
                    <CardDeck>
                        
                            <Card key={course.id}>
                                <h1>show : {course.title}</h1>
                            </Card>
                        
                    </CardDeck>
                </Col>
            </Row>
        </Container>

    

    );
};

export default Course;
