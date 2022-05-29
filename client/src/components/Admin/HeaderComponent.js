import React, { Component } from "react";
import { Button, Container, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';




export default class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {

            isModalOpen: false
        };


        this.toggleModal = this.toggleModal.bind(this);
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    render() {
        return (
            <div>
                <div className="">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/requests" text="info"><img src="assets/images/logo04.png" height="40" width="40" alt="logo.png" /> Admin</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <LinkContainer to="/requests"><Nav.Link ><span className="fa fa-id-card-o fa-lg"></span> Requests </Nav.Link></LinkContainer>
                                <LinkContainer to="/vehicledetails"><Nav.Link ><span className="fa fa-car fa-lg"></span> View Vehicle Details </Nav.Link></LinkContainer>
                            </Nav>
                            <Nav>
                                <Navbar.Brand></Navbar.Brand>

                                <NavDropdown  title={<><span className="fa fa-user fa-lg"></span> firstname lastname long</>} id="collasible-nav-dropdown">
                                    <NavDropdown.Header >1999xxxxxxV</NavDropdown.Header>
                                    <NavDropdown.Item href="#"><span className="fa fa-sign-out fa-lg"></span> Logout</NavDropdown.Item>
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
                                <h2>Admin</h2>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <Modal show={this.state.isModalOpen} onHide={this.toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.toggleModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}