import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
    return (

        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/">
                <Link to="/" style={{
                    textDecoration: "none", color: "white"
                }}>
                    Code.Hub Dashboard
          </Link>
            </Navbar.Brand>
            <Nav className="mr-auto " />
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link>
                        <Link to="/courses" style={{
                            textDecoration: "none", color: "white"
                        }}>Courses</Link></Nav.Link>
                    <Nav.Link>
                        <Link to="/addNewCourse" style={{
                            textDecoration: "none", color: "white"
                        }}>Add new course</Link> </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;