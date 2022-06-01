import React, { Component, useEffect, useState } from "react";
import { Badge, Button, Card, CloseButton } from "react-bootstrap";
import ReactCardFlip from 'react-card-flip';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';
import DateReservationComponent from "./ReservationComponent";
import UploadComponent from "./UploadComponent";

const axios = require('axios').default;

const RegisterNewVehicle = () => {

    const storageUserData = JSON.parse(sessionStorage.getItem("userData"));
    const stored_id = useSelector(state => state.user.id);
    const user_id = (stored_id !== '') ? stored_id : storageUserData.id;

    const [dateFlipped, setDateFlipped] = useState(false);
    const [subFlipped, setSubFlipped] = useState(false);
    const [subStatus, setSubStatus] = useState(false);
    const [ownerReservedDates, setOwnerReservedDates] = useState([]);

    useEffect(() => {

        const token = sessionStorage.getItem('token');

        axios.get(`http://localhost:5000/owner/reservedDates/${user_id}`, {
            headers: {
                'Content-Type': 'application/json',
                token: token,
            }
        })
            .then(response => {

                let status = response.data.status;
                let ownerReservedDates = response.data.ownerReservedDates;
                if (status === 'ok') {
                    setOwnerReservedDates(ownerReservedDates)
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
                                <Card.Subtitle>Reserved Date: {(ownerReservedDates) ? ownerReservedDates.map((dt) => <Badge bg="warning" text="dark">{dt}</Badge>) : <Badge bg="secondary">No Reservation</Badge>}</Card.Subtitle>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                                <Button onClick={flipDate}>Click to Reserve a Date</Button>
                            </Card.Body>
                        </Card>
                        <Card body border="info" className="shadow-lg" style={{ "paddingLeft": "0px", "paddingRight": "0px", backgroundColor: "#d2ebeb"}}>


                            <div className='row '>
                                <div className="col-10 align-self-center">
                                    <Card.Title style={{  }}>Select a Date</Card.Title>
                                </div>
                                <div className='col text-end p-3'>
                                    <CloseButton  onClick={flipDate} />
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
                                <Card.Subtitle>{(subStatus) ? <Badge bg="warning" text="dark">Submited</Badge> : <Badge bg="secondary">No Submission</Badge>}</Card.Subtitle>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                                <Button onClick={flipSub}>Click to Submit Form</Button>
                            </Card.Body>
                        </Card>
                        <Card className="shadow-lg" >
                            <Card.Img variant="top" src="/assets/images/upload.png" height="350" />
                            <Card.ImgOverlay className="text-end">
                                <CloseButton  onClick={flipSub} />
                            </Card.ImgOverlay>
                            <Card.Body>
                                <Card.Title>Upload Documents to Register your new Vehicle</Card.Title>
                                <UploadComponent type={'Vehicle Registration'} />
                                <br></br>
                                
                            </Card.Body>
                        </Card>
                    </ReactCardFlip>
                </div>


            </div>

        </div>
    )

}

export default RegisterNewVehicle