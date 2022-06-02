import React, { useEffect, useState } from "react";
import { Container, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import NotificationTable from "./NotificationComponent";
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useRef } from "react";

import { isVehRegDocDone, vehRegDateResed } from "../statusSlice";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const isNumber = (val) => !(val) || !isNaN(Number(val));
const validEmail = (val) => !(val) || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const validPass = (val) => !(val) || /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!@$%^&]).{8,32}$/i.test(val);
const validRePass = (val1) => (val2) => (!(val1) && !(val2)) || ((val1) && val1 === val2);
const validNic = (val) => !(val) || (/^[VX0-9]{10}$/i.test(val)) || (/^[0-9]{12}$/i.test(val));

const axios = require('axios').default;

async function editUser(data) {

    const token = sessionStorage.getItem('token');

    return fetch('http://localhost:5000/owner/editProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
}

function Header(props) {

    const token = sessionStorage.getItem('token');

    if(!token){
        sessionStorage.clear();
        document.location = '/';
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const dispatch = useDispatch();
    const toast = useRef(null);
    const navigate = useNavigate();

    const userData = JSON.parse(sessionStorage.getItem("userData"));

    const stored_fullName = useSelector(state => state.user.fullName);
    const stored_id = useSelector(state => state.user.id);
    const stored_nic = useSelector(state => state.user.nic);

    //Edit Profile--------------------------------------
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [value, setValue] = useState("");
    const toggleEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    }

    const handleChange = (event) => {
        setValue(event.target.value );
    }

    const handleEdit = async (values) => {

        let submit_data = {};
        for(let key in values){
            if(key !== 'rePassword'){
                submit_data[key] = values[key];
            }
        }
        submit_data['nic'] = nic;

        const response = await editUser(submit_data);

        if(response.status === 'error'){
            toast.current.show({severity:'error', summary: `${response.error}`, detail: "Invalid edit!", life: 5000});
        }
        else{
            toggleEditModal();

            if(response.password_changed){
                sessionStorage.clear();
                toast.current.show({severity:'info', summary: `${response.msg}`, detail: "Update Success!", life: 5000});
                document.location = '/';
            }
            else{
                sessionStorage.setItem('userData', JSON.stringify(response.data));
                toast.current.show({severity:'info', summary: `${response.msg}`, detail: "Update Success!", life: 5000});
                navigate('/ownerDashboard', { replace: true });
            }
        }
    }
    //-----------------------------------------------------

    //Notices------------------------------------
    const isVehRegDate = useSelector(state =>state.status.vehRegDateRes);
    const isVehRegDoc = useSelector(state =>state.status.vehRegDocDone);
    
    if (isVehRegDate) { 
        toast.current.show({severity: 'success', summary: "Date Successfully Reserved!" , life: 5000});
        delay(5000);
        dispatch(vehRegDateResed());
        navigate("/ownerDashboard")
         
    }else if(isVehRegDoc){
        toast.current.show({severity: 'success', summary: "File Successfully Uploaded" , life: 5000});
        delay(5000);
        dispatch(isVehRegDocDone());
        navigate("/ownerDashboard/ownvehicles")
    }

    //----------------------------------------------
    
    const user_id = userData.id;
    const nic = userData.nic;
    const fullName = userData.fullName;

    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);

    const toggleNotif = () => setNotificationOpen(!notificationOpen);

    useEffect(() => {

        axios.get(`http://localhost:5000/owner/unreadNotificationCount/${user_id}`, {
            headers: {
                'Content-Type': 'application/json',
                token: token,
            }
        })
            .then(response => {

                let status = response.data.status;
                let notificationCount = response.data.notificationCount;

                if(status === 'ok'){
                    setNotificationCount(notificationCount)
                }
                else if(status === 'auth-error'){
                    sessionStorage.clear();
                    document.location = '/';
                }
                else{
                    console.log(response.error);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const [displayResponsive, setDisplayResponsive] = useState(false);

    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive
    }
    const onClick = (type) => {
        dialogFuncMap[`${type}`](true);
        setNotificationCount(0);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
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
            <Toast ref={toast} />
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/ownerDashboard/ownvehicles"><img src="/assets/images/logo04.png" height="40" width="40" alt="logo.png" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/ownerDashboard/ownvehicles"><Nav.Link ><span className="fa fa-car fa-lg"></span> Own Vehicles </Nav.Link></LinkContainer>
                            <LinkContainer to="/ownerDashboard/registernewvehicle"><Nav.Link ><span className="fa fa-pencil-square-o fa-lg"></span> Reg. new vehicle</Nav.Link></LinkContainer>
                            <LinkContainer to="/ownerDashboard/renewlicense"><Nav.Link ><span className="fa fa-id-card-o fa-lg"></span> Renew License </Nav.Link></LinkContainer>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#" onClick={() => onClick('displayResponsive')}><div className="fa fa-bell-o fa-lg">
                                <span className="e-badge e-badge-danger e-badge-overlap e-badge-notification e-badge-circle" style={{ transform: "translateY(-10px) translateX(-9px)", position: "unset" }}>{notificationCount}</span>
                            </div></Nav.Link>

                            <NavDropdown  title={<><span className="fa fa-user fa-lg"></span> {fullName} </>} id="collasible-nav-dropdown">
                                <NavDropdown.Header >{nic}</NavDropdown.Header>
                                <NavDropdown.Item href="#" onClick={toggleEditModal}><span className="fa fa-cogs fa-lg"></span> Account Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#" onClick={() => handleShow()}><span className="fa fa-sign-out fa-lg"></span> Logout</NavDropdown.Item>
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
                            <p>We strive to provide hassle-free vehicle registration and licensing services to your fingertips using cutting-edge technology.
                               Keeping track of your automobiles has never been easier.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <Dialog header="Notifications" maximizable  visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} position="top-right" >
                <NotificationTable />

            </Dialog>
            <Modal show={notificationOpen} onHide={toggleNotif}>
                <Modal.Header closeButton>
                    
                </Modal.Header>
                
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
            <Modal show={isEditModalOpen} onHide={toggleEditModal}>
                <ModalHeader toggle={toggleEditModal}>Edit Profile</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleEdit(values)} >
                        <Row className="form-group">
                            <Label htmlFor="firstName" md={4}>First Name</Label>
                            <Col md={8}>
                                <Control.text model=".firstName" id="firstName" name="firstName"
                                    placeholder="First Name"
                                    className="form-control"
                                    validators={{
                                         minLength: minLength(3), maxLength: maxLength(15)
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
                            <Label htmlFor="lastName" md={4}>Last Name</Label>
                            <Col md={8}>
                                <Control.text model=".lastName" id="lastName" name="lastName"
                                    placeholder="Last Name"
                                    className="form-control"
                                    validators={{
                                         minLength: minLength(3), maxLength: maxLength(15)
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
                            <Label htmlFor="contactNo" md={4}>Contact No.</Label>
                            <Col md={8}>
                                <Control.text model=".contactNo" id="contactNo" name="contactNo"
                                    placeholder="Tel. Number"
                                    className="form-control"
                                    validators={{
                                         minLength: minLength(3), maxLength: maxLength(15), isNumber
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
                            <Label htmlFor="email" md={4}>Email</Label>
                            <Col md={8}>
                                <Control.text model=".email" id="email" name="email"
                                    placeholder="Email"
                                    className="form-control"
                                    validators={{
                                         validEmail
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
                            <Label htmlFor="address" md={4}>Address</Label>
                            <Col md={8}>
                                <Control.text model=".address" id="address" name="address"
                                    placeholder="Address"
                                    className="form-control"
                                    validators={{
                                         minLength: minLength(3)
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
                            <Label htmlFor="nic" md={4}>NIC</Label>
                            <Col md={8}>
                                <Control.text model=".nic" id="nic" name="nic"
                                    placeholder="NIC"
                                    className="form-control"
                                    validators={{
                                         validNic
                                    }}
                                    disabled
                                    value={stored_nic}
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
                            <Label htmlFor="oldPassword" md={4}>Current Password</Label>
                            <Col md={8}>
                                <Control.password model=".oldPassword" id="oldPassword" name="oldPassword"
                                    placeholder="Current Password"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".oldPassword"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                    }}
                                    wrapper="ul"
                                    component="li"
                                />
                            </Col>
                        </Row>
                        
                        <Row className="form-group">
                            <Label htmlFor="password" md={4}>New Password</Label>
                            <Col md={8}>
                                <Control.password onChange={handleChange} model=".password" id="password" name="password"
                                    placeholder="New Password"
                                    className="form-control"
                                    validators={{
                                         validPass
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
                            <Label htmlFor="rePassword" md={4}>Re-Password</Label>
                            <Col md={8}>
                                <Control.password model=".rePassword" id="rePassword" name="rePassword"
                                    placeholder="Re-Password"
                                    className="form-control"
                                    validators={{
                                         validRePass: validRePass(value)
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
                            <Col md={{ size: 8, offset: 4 }}>
                                <Button type="submit" color="primary">
                                    Update Profile
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default Header;