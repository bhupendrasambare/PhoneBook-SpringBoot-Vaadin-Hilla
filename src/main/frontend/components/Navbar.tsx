
import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import "../style/home.css"
import { Nav } from 'react-bootstrap';
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineContactMail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaBarsStaggered } from "react-icons/fa6";

function NavbarComponent() {
  
    const navigate = useNavigate();

    const logout = () =>{
        navigate("/login");
    }

    return (
        <Navbar collapseOnSelect expand="sm" className="bg-transparent shadow">
            <Container>
                <Navbar.Brand onClick={()=>navigate("/")} className='fs-4 fw-bold text-light cursor-pointer fst-italic text-design'>
                    Phone book
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"><FaBarsStaggered className="fs-4 text-light" /></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='ms-auto fw-bold'>
                        <Navbar.Text className='text-dark d-flex align-items-center cursor-pointer me-3'>
                            <div className="me-4" title="Contact" onClick={()=>navigate("/")}>
                                <MdOutlineContactMail className="fs-4 text-light" />
                            </div>
                            <div className="me-4" title="Profile" onClick={()=>navigate("/profile")}>
                                <CgProfile className="fs-4 text-light" />
                            </div>
                            <div className="me-4" title="Logout" onClick={logout}>
                                <IoIosLogOut className="fs-4 text-light" />
                            </div>

                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;