
import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import "../style/home.css"
import { Nav } from 'react-bootstrap';

function NavbarComponent() {
  
  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="sm" className="bg-transparent shadow">
      <Container>
        <Navbar.Brand onClick={()=>navigate("/")} className='fs-4 fw-bold text-dark cursor-pointer fst-italic text-design'>
            Phone book
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='ms-auto fw-bold'>
            <Navbar.Text className='text-dark cursor-pointer me-3'
            onClick={()=>navigate("/dashboard")}>
              Dashboard
            </Navbar.Text>
            <Navbar.Text className='text-dark cursor-pointer me-3'
            onClick={()=>navigate("/students")}>
              Students
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;