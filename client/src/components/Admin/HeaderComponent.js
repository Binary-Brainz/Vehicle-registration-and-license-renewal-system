import React, { Component, useState } from "react";
import { Button, Container, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';

const axios = require('axios').default;

function Header (props) {

    const token = sessionStorage.getItem('officer_token');

    if(!token){
        sessionStorage.clear();
        document.location = '/';
    }

    const userData = JSON.parse(sessionStorage.getItem("userData"));

    const stored_fullName = useSelector(state => state.user.fullName);
    const stored_id = useSelector(state => state.user.id);
    const stored_nic = useSelector(state => state.user.nic);
    
    const user_id = (stored_id !== '')? stored_id : userData.id;
    const nic = (stored_nic !== '')? stored_nic : userData.nic;
    const fullName = (stored_fullName !== '')? stored_fullName : userData.fullName;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleClose = () => setShowConfirm(false);
    const handleShow = () => setShowConfirm(true);

    const confirmLogout = () => {
        sessionStorage.clear();
        setShowConfirm(false);
        document.location = '/';
    }

    return (
        <div>
            <div className="">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/adminDashboard/requests" text="info"><img src="/assets/images/logo04.png" height="40" width="40" alt="logo.png" /> Admin</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/adminDashboard/requests"><Nav.Link ><span className="fa fa-id-card-o fa-lg"></span> Requests </Nav.Link></LinkContainer>
                            <LinkContainer to="/adminDashboard/vehicledetails"><Nav.Link ><span className="fa fa-car fa-lg"></span> View Vehicle Details </Nav.Link></LinkContainer>
                        </Nav>
                        <Nav>
                            <Navbar.Brand></Navbar.Brand>

                            <NavDropdown  title={<><span className="fa fa-user fa-lg"></span> {fullName} </>} id="collasible-nav-dropdown">
                                <NavDropdown.Header >{nic}</NavDropdown.Header>
                                <NavDropdown.Item href="#" onClick={() => handleShow()}><span className="fa fa-sign-out fa-lg"></span> Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="jumbotron">
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-8">
                            <h1>Vehicle Registration and Licening System </h1>
                            <p>We strive to provide hassle-free vehicle registration and licensing services to your fingertips using cutting-edge technology.
                                Keeping track of your automobiles has never been easier.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <Modal show={isModalOpen} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={toggleModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showConfirm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmLogout}>
                    Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Header;