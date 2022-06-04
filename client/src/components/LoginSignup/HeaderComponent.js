/* eslint-disable react/jsx-pascal-case */

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    
    Modal, ModalHeader, ModalBody, Label, Col, Row
} from 'reactstrap';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Toast } from 'primereact/toast';
import VehicleOwnerMain from "../VehicleOwnerMainComponent";
import AdminMainComponent from "../AdminMainComponent";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const validPass = (val) => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!@$%^&]).{8,32}$/i.test(val);
const validRePass = (val1) => (val2) => val1 === val2;
const validNic = (val) => (/^[VX0-9]{10}$/i.test(val)) || (/^[0-9]{12}$/i.test(val));

async function signUpUser(data) {
    return fetch('/owner/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
}

async function loginOwner(data) {
    return fetch('/owner/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
}

async function loginOfficer(data) {

    return fetch('/officer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
}

function Header(props) {

    let navigate = useNavigate();

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [signUpError, setSignUpError] = useState('');
    const [value, setValue] = useState('');
    const toast = useRef(null);

    // if(loginError){
    //     toast.current.show({severity:'error', summary: "Invalid login details!", life: 5000});
    // }

    const handleChange = (event) => {
        setValue(event.target.value );
    }

    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    }

    const toggleSignupModal = () => {
        setIsSignupModalOpen(!isSignupModalOpen);
    }

    const handleSignup = async (values) => {

        sessionStorage.clear();

        const response = await signUpUser(values);

        if(response.status === 'error'){
            setSignUpError(response.error );
            toast.current.show({severity:'error', summary: `${response.error}`, detail: "Invalid signup!", life: 5000});
        }
        else{

            toggleSignupModal();
            
            sessionStorage.setItem('userType', JSON.stringify(response.userType));
            sessionStorage.setItem('userData', JSON.stringify(response.data));
            sessionStorage.setItem('owner_token', JSON.stringify(response.token));

            props.setAuthState(response);

            navigate('/ownerDashboard', { replace: true });
        }
    }

    const handleLogin = async (event) => {


        let response;
        let type;
        let nic_arr = event.nic.split("-");

        sessionStorage.clear();
        
        if(nic_arr.length === 1){

            type = 'owner';

            response = await loginOwner({
                nic: event.nic.toLowerCase(),
                password: event.password
            });
        }
        else if(nic_arr[1].trim().toLowerCase() === 'officer'){

            type = 'officer';

            response = await loginOfficer({
                nic: nic_arr[0].trim().toLowerCase(),
                password: event.password
            });
        }

        if(response.status === 'error'){
            setLoginError(response.error );
            toast.current.show({severity:'error', summary: `${response.error}`, detail: "Invalid login details!", life: 5000});
        }
        else{
            
            toggleLoginModal();

            sessionStorage.setItem('userType', JSON.stringify(response.userType));
            sessionStorage.setItem('userData', JSON.stringify(response.data));

            props.setAuthState(response);

            if(type === 'owner'){
                sessionStorage.setItem('owner_token', JSON.stringify(response.token));
                navigate('/ownerDashboard', { replace: true });
            }
            else{
                sessionStorage.setItem('officer_token', JSON.stringify(response.token));
                navigate('/adminDashboard', { replace: true });
            }
        }
    }
    
    return (
        <React.Fragment>
            <Toast ref={toast} position="top-right" />
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home"><img src="/assets/images/logo04.png" height="40" width="40" alt="logo.png" /> Vehicle Registration and Licensing</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#" onClick={toggleSignupModal}>Signup</Nav.Link>
                            <Nav.Link href="#" onClick={toggleLoginModal}>
                                    
                                        <span className="fa fa-sign-in fa-lg"></span> Login
                                    
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Modal isOpen={isLoginModalOpen} toggle={toggleLoginModal}>
                <ModalHeader toggle={toggleLoginModal}>Login </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleLogin(values)}>
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
            <Modal isOpen={isSignupModalOpen} toggle={toggleSignupModal}>
                <ModalHeader toggle={toggleSignupModal}>Signup </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSignup(values)} >
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
                                <Control.password onChange={handleChange} model=".password" id="password" name="password"
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
                                        required, validRePass: validRePass(value)
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

export default Header;