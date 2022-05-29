import React, { useState } from "react";
import { Button, Container, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { gotId, gotNic } from '../userSlice'



function Header(props) {

    const nic = useSelector(state => state.user.nic)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen({
            isModalOpen: !isModalOpen
        });
    }

    return (
        <div>
            <div className="">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/ownvehicles"><img src="/assets/images/logo04.png" height="40" width="40" alt="logo.png" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/ownerDashboard/ownvehicles"><Nav.Link ><span className="fa fa-car fa-lg"></span> Own Vehicles </Nav.Link></LinkContainer>
                            <LinkContainer to="/ownerDashboard/registernewvehicle"><Nav.Link ><span className="fa fa-pencil-square-o fa-lg"></span> Reg. new vehicle</Nav.Link></LinkContainer>
                            <LinkContainer to="/ownerDashboard/renewlicense"><Nav.Link ><span className="fa fa-id-card-o fa-lg"></span> Renew License </Nav.Link></LinkContainer>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#" onClick={toggleModal}><div className="fa fa-bell-o fa-lg">
                                <span className="e-badge e-badge-danger e-badge-overlap e-badge-notification e-badge-circle" style={{ transform: "translateY(-10px) translateX(-9px)", position: "unset" }}>99</span>
                            </div></Nav.Link>

                            <NavDropdown  title={<><span className="fa fa-user fa-lg"></span> firstname lastname long</>} id="collasible-nav-dropdown">
                                <NavDropdown.Header >{nic}</NavDropdown.Header>
                                <NavDropdown.Item href="#"><span className="fa fa-cogs fa-lg"></span> Account Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#"><span className="fa fa-sign-out fa-lg"></span> Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="jumbotron">
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Vehicle Registration and Licening</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
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
        </div>
    );
}

export default Header;