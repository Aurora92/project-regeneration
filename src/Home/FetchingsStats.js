import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { API } from '../api';

function FetchingStats() {
    const [stats, setStats] = useState([]);
  
    const axios = require("axios");
  
    if (stats.length === 0) {
      axios
        .get(`${API}/stats`)
        .then(function (response) {
          // handle success
          setStats(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
    return (
      <Row>
        {stats.map((stat) => (
          <Col>
            <Card key={stat.id}>
              <Card.Body>
                {stat.title.toUpperCase()} <span>: </span>
                <Badge variant="secondary"> {stat.amount}</Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  export default FetchingStats;