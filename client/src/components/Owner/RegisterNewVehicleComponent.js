import React, { Component, useEffect, useState } from "react";
import { Badge, Card, CloseButton } from "react-bootstrap";
import ReactCardFlip from 'react-card-flip';
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';
import DateReservationComponent from "./ReservationComponent";
import UploadComponent from "./UploadComponent";

const axios = require('axios').default;

const RegisterNewVehicle = () => {

    const token = sessionStorage.getItem('owner_token');

    if(!token){
        sessionStorage.clear();
        document.location = '/';
    }

    const storageUserData = JSON.parse(sessionStorage.getItem("userData"));
    const stored_id = useSelector(state => state.user.id);
    const user_id = (stored_id !== '') ? stored_id : storageUserData.id;

    const [dateFlipped, setDateFlipped] = useState(false);
    const [subFlipped, setSubFlipped] = useState(false);
    const [subStatus, setSubStatus] = useState(false);
    const [ownerReservedDates, setOwnerReservedDates] = useState([]);

    useEffect(() => {

        axios.get(`/owner/reservedDates/${user_id}`, {
            headers: {
                'Content-Type': 'application/json',
                token: token,
            }
        })
            .then(response => {

                let status = response.data.status;
                let ownerReservedDates = response.data.ownerReservedDates;
                if (status === 'ok') {
                    setOwnerReservedDates(ownerReservedDates.slice(-6))
                }
                else if(status === 'auth-error'){
                    sessionStorage.clear();
                    document.location = '/';
                }
                else {
                    console.log(response.error);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const flipDate = (e) => {
        setDateFlipped(!dateFlipped);
    }

    const flipSub = (e) => {
        setSubFlipped(!subFlipped);
    }

    return (
        <div className="container">
            <div className="row ">
                <div className="col-12 col-md-6 d-flex justify-content-center" style={{ padding: "50px" }}>
                    <ReactCardFlip isFlipped={dateFlipped} flipDirection="vertical">
                        <Card style={{ "paddingLeft": "0px", "paddingRight": "0px" }} className="shadow-lg" >
                            <Card.Img variant="top" src="/assets/images/date.gif" height="350" />
                            <Card.Body>
                                <Card.Title>Reserve a Date</Card.Title>
                                {(ownerReservedDates) ? <Card.Subtitle>Reserved Dates<br/> {ownerReservedDates.map((dt) => <span><Badge bg="warning" text="dark">{dt}</Badge> </span> )}</Card.Subtitle> : <Card.Subtitle>Reserved Date<br/> <Badge bg="secondary">No Reservation</Badge> </Card.Subtitle>}
                                <Card.Text>
                                Book an appointment on a date and get a fully detailed report of 
                                 your vehicle prepared by our professionals
                                </Card.Text>
                                <Button label="Click to Reserve a Date" className="p-button-sm p-button-rounded" onClick={flipDate}></Button>
                            </Card.Body>
                        </Card>
                        <Card body border="info" className="shadow-lg" style={{ "paddingLeft": "0px", "paddingRight": "0px", backgroundColor: "#d2ebeb" }}>


                            <div className='row '>
                                <div className="col-10 align-self-center">
                                    <Card.Title style={{}}>Select a Date</Card.Title>
                                </div>
                                <div className='col text-end p-3'>
                                    <CloseButton onClick={flipDate} />
                                </div>
                            </div>


                            <Card.Body className="text-center">
                                <DateReservationComponent />
                            </Card.Body>
                        </Card>
                    </ReactCardFlip>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center" style={{ padding: "50px" }}>
                    <ReactCardFlip isFlipped={subFlipped} flipDirection="vertical">
                        <Card style={{ "paddingLeft": "0px", "paddingRight": "0px" }} className="shadow-lg" >
                            <Card.Img variant="top" src="/assets/images/fileSub.gif" height="350" />
                            <Card.Body>
                                <Card.Title>Submit Vehicle Details Form</Card.Title>
                                <Card.Subtitle >Accepted Types<br/><Badge>PDF</Badge> <Badge bg="success" >IMAGE</Badge></Card.Subtitle>
                                <Card.Text>
                                To register your vehicle or update your vehicle details, submit a PDF or an
                                image of the vehicle details report created by an authorized place
                                </Card.Text>
                                <Button label="Click to Submit Form" className="p-button-sm p-button-rounded" onClick={flipSub}></Button>
                            </Card.Body>
                        </Card>
                        <Card className="shadow-lg" >
                        
                            <Card.Img  src="/assets/images/upload.png" height="350" />
                            <Card.ImgOverlay style={{backdropFilter: "blur(3px)"}}>
                            <div className="text-end"><CloseButton onClick={flipSub}  /></div><br/>
                                <Card.Body>
                                <Card.Title>Upload Vehicle Registration Document</Card.Title>
                                <UploadComponent type={'Vehicle Registration'} />
                                <br></br>
                                </Card.Body>
                            
                            </Card.ImgOverlay>

                            
                            
                        </Card>
                    </ReactCardFlip>
                </div>


            </div>

        </div>
    )

}

export default RegisterNewVehicle