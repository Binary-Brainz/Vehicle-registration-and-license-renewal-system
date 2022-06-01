import React, { useEffect, useState } from "react";
import { Container, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import NotificationTable from "./NotificationComponent";
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useRef } from "react";
import { vehRegDateResed } from "../statusSlice";


const axios = require('axios').default;

function Header() {

    const token = sessionStorage.getItem('token');

    if(!token){
        sessionStorage.clear();
        document.location = '/';
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const dispatch = useDispatch();
    const toast = useRef(null);

    const userData = JSON.parse(sessionStorage.getItem("userData"));

    const stored_fullName = useSelector(state => state.user.fullName);
    const stored_id = useSelector(state => state.user.id);
    const stored_nic = useSelector(state => state.user.nic);

    const isVehRegDate = useSelector(state =>state.status.vehRegDateRes);
    
    
    if (isVehRegDate) { 
        toast.current.show({severity: 'success', summary: "Date successfully Reserved!" , life: 5000});
        delay(5000);
        dispatch(vehRegDateResed());  
    }
    
    const user_id = userData.id;
    const nic = userData.nic;
    const fullName = userData.fullName;

    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);

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
            <Dialog header="Notifications" maximizable  visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} position="top-right" >
                <NotificationTable />

            </Dialog>
            <Modal show={notificationOpen} onHide={toggleNotif}>
                <Modal.Header closeButton>
                    
                </Modal.Header>
                
            </Modal>      
        </div>
    );
}

export default Header;