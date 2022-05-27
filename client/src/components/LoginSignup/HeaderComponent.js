/* eslint-disable react/jsx-pascal-case */

import React, { Component } from "react";
import {
    Nav, Navbar, NavbarBrand, NavItem,
    Button, Modal, ModalHeader, ModalBody, Label, NavLink, Col, Row
} from 'reactstrap';
import Image from "react-bootstrap/Image";
import { Control, Errors, LocalForm } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const validPass = (val) => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!@$%^&]).{8,32}$/i.test(val);
const validRePass = (val1) => (val2) => val1 === val2;
const validNic = (val) => (/^[VX0-9]{10}$/i.test(val)) || (/^[0-9]{12}$/i.test(val));


class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleSignupModal = this.toggleSignupModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            isLoginModalOpen: false,
            isSignupModalOpen: false,
            value: ''
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});  
    }


    toggleLoginModal() {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen,
        });
    }

    toggleSignupModal() {
        this.setState({
            isSignupModalOpen: !this.state.isSignupModalOpen,
        });
    }

    handleSignup(values) {
        this.toggleSignupModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    handleLogin(event) {
        this.toggleLoginModal();
        alert(
            "NIC: " +
            this.nic.value +
            " Password: " +
            this.password.value
        );
        event.preventDefault();
    }
    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md" style={{ "padding": "0px" }}>
                    <div className="headr">
                        <div className="row d-flex align-items-center">
                            <div className="col-2 col-sm-1 float-left">
                                <NavbarBrand>
                                    <Image
                                        roundedCircle
                                        fluid
                                        src="assets/images/logo1.png"
                                        alt="logo.jpg"
                                    />
                                </NavbarBrand>
                            </div>
                            <div className="col-8">
                                <h2 className="header1">Vehicle Registration System</h2>
                            </div>
                            <div className="col">
                                <Nav className="ml-auto justify-content-end" navbar>
                                    <NavItem>
                                        <NavLink style={{ color: "#0d6efd", cursor: "pointer" }} onClick={this.toggleSignupModal}  >
                                            Sign Up
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <Button outline color="primary" onClick={this.toggleLoginModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                        </Button>
                                    </NavItem>
                                </Nav>
                            </div>
                        </div>
                    </div>
                </Navbar>
                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Login </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                            <Row className="form-group">
                                <Label htmlFor="nic" md={3}>NIC</Label>
                                <Col md={9}>
                                    <Control.text model=".nic" id="nic" name="nic"
                                        placeholder="NIC"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".nic"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                        }}
                                        wrapper="ul"
                                        component="li"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" md={3}>Password</Label>
                                <Col md={9}>
                                    <Control.password model=".password" id="password" name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: 'Required'

                                        }}
                                        wrapper="ul"
                                        component="li"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 9, offset: 3 }}>
                                    <Button type="submit" color="primary">
                                        Login
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>

                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isSignupModalOpen} toggle={this.toggleSignupModal}>
                    <ModalHeader toggle={this.toggleSignupModal}>Signup </ModalHeader>
                    <ModalBody>
                        <LocalForm  onSubmit={(values) => this.handleSignup(values)} >
                            <Row className="form-group">
                                <Label htmlFor="firstName" md={3}>First Name</Label>
                                <Col md={9}>
                                    <Control.text model=".firstName" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".firstName"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        wrapper="ul"
                                        component="li"

                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={3}>Last Name</Label>
                                <Col md={9}>
                                    <Control.text model=".lastName" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".lastName"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        wrapper="ul"
                                        component="li"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="contactNo" md={3}>Contact No.</Label>
                                <Col md={9}>
                                    <Control.text model=".contactNo" id="contactNo" name="contactNo"
                                        placeholder="Tel. Number"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".contactNo"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }}
                                        wrapper="ul"
                                        component="li"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={3}>Email</Label>
                                <Col md={9}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                        wrapper="ul"
                                        component="li"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="address" md={3}>Address</Label>
                                <Col md={9}>
                                    <Control.text model=".address" id="address" name="address"
                                        placeholder="Address"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".address"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                        }}
                                        wrapper="ul"
                                        component="li"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="nic" md={3}>NIC</Label>
                                <Col md={9}>
                                    <Control.text model=".nic" id="nic" name="nic"
                                        placeholder="NIC"
                                        className="form-control"
                                        validators={{
                                            required, validNic
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".nic"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validNic: 'Not a valid NIC'
                                        }}
                                        wrapper="ul"
                                        component="li"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" md={3}>Password</Label>
                                <Col md={9}>
                                    <Control.password onChange={this.handleChange} model=".password" id="password" name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required, validPass
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validPass: 'Password must contain At least one upper case English letter, At least one lower case English letter, At least one digit, At least one special character(#?!@$%^&*-), Minimum eight in length'
                                        }}
                                        wrapper="ul"
                                        component="li"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="rePassword" md={3}>Re-Password</Label>
                                <Col md={9}>
                                    <Control.password model=".rePassword" id="rePassword" name="rePassword"
                                        placeholder="Re-Password"
                                        className="form-control"
                                        validators={{
                                            required, validRePass: validRePass(this.state.value)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".rePassword"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validRePass: 'Re-Password is not matching with Password'
                                        }}
                                        wrapper="ul"
                                        component="li"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 9, offset: 3 }}>
                                    <Button type="submit" color="primary">
                                        Signup
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>



        );
    }

}

export default Header;