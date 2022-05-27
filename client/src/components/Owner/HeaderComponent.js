import React, { Component } from "react";
import {
    Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input
} from 'reactstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();

    }

    render() {
        return (
            <div>
                <Navbar dark expand="sm">
                    <div className="container">
                        <NavbarToggler className="col-3 float-left" onClick={this.toggleNav} />
                        <div className="row">
                            <div className="col-auto col-sm-1 float-left">
                                <NavbarBrand href="/"><img src="assets/images/logo1.png" height="40" width="50" alt="logo.png" /></NavbarBrand>
                            </div>

                            <div className="col-12 col-sm-11 float-right justify-content-end">

                                <Collapse isOpen={this.state.isNavOpen} navbar>
                                    <div className="col-12 col-sm-11 float-left">
                                        <Nav navbar>
                                            <NavItem>
                                                <NavLink className="nav-link" to="/ownvehicles"><span className="fa fa-car fa-lg"></span> Own Vehicles </NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink className="nav-link" to="/registernewvehicle"><span className="fa fa-pencil-square-o fa-lg"></span> Reg. new vehicle </NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink className="nav-link" to="/menu"><span className="fa fa-id-card-o fa-lg"></span> Renew License </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                    <div className="col-12 col-sm-2 ">
                                        <Nav className="ml-auto" navbar>
                                            <NavItem>
                                                <NavLink onClick={this.toggleModal} className="nav-link" to="/">

                                                    <div className="fa fa-bell-o fa-lg">
                                                        <span className="e-badge e-badge-danger e-badge-overlap e-badge-notification e-badge-circle" style={{ transform: "translateY(-10px) translateX(-9px)", position: "unset" }}>99</span>
                                                    </div>

                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink onClick={this.toggleModal} className="nav-link" to="/"><span className="fa fa-user fa-2x"></span></NavLink>

                                            </NavItem>
                                        </Nav>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
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
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Login
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Header;