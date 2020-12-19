import { API } from '../api';
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Course from "../Course";



const CoursesTable = () => {
    const [idCourse, setIdCourse] = useState("01");

    const [coursesList, setCoursesList] = useState([]);
    const axios = require("axios");
    useEffect(() => {
        if (coursesList.length === 0) {
            axios
                .get(`${API}/courses`)
                .then(function (response) {
                    // handle success

                    setCoursesList(response.data);


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

    Course({
        resource: idCourse,
        format: "json"
    }
    );

    //console.log(Course);

    return (

        <Table responsive>
            <thead>
                <tr>
                    <th />
                    <th>Title</th>
                    <th>Bookable</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {coursesList.slice(Math.max(coursesList.length - 5, 0)).map((course) => (
                    <tr key={course.id}>
                        <td>
                            <svg
                                width="2em"
                                height="2em"
                                viewBox="0 0 16 16"
                                className="bi bi-info-square-fill"
                                fill="blue"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                                />
                            </svg>
                        </td>
                        <td>{course.title}</td>
                        <td>
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
                        </td>
                        <td>{course.price.normal} €</td>
                        <td>
                            {course.dates.start_date} - {course.dates.end_date}
                        </td>
                        <td>
                            <Button variant="primary" onClick={() => setIdCourse(course.id)}><Link to="/course" style={{
                                textDecoration: "none", color: "white"
                            }} >View Details</Link></Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>

    );

};

export default CoursesTable;