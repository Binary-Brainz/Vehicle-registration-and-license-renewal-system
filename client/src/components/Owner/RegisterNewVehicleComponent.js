import React, { Component, useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import ReactCardFlip from 'react-card-flip';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';
import DateReservationComponent from "./ReservationComponent";
import UploadComponent from "./UploadComponent";

const axios = require('axios').default;

const RegisterNewVehicle = () => {

    const id = useSelector(state => state.user.id);

    const [dateFlipped, setDateFlipped] = useState(false);
    const [subFlipped, setSubFlipped] = useState(false);
    const [reservedDate, setReservedDate] = useState("");
    const [subStatus, setSubStatus] = useState(false);
    const [ownerReservedDates, setOwnerReservedDates] = useState([]);

    useEffect(() => {

        const token = sessionStorage.getItem('token');

        axios.get(`https://vrse17-backend.herokuapp.com/reservedDates/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                token: token,
            }
        })
            .then(response => {

                let status = response.data.status;
                let ownerReservedDates = response.data.ownerReservedDates;

                if(status === 'ok'){
                    setOwnerReservedDates(ownerReservedDates)
                }
                else{
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

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const disableFutureDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 4).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onReserve = (data) => {
        console.log(data);
    }

    const onUpload = (data) => {
        console.log(data);
    }

    return (
        <div className="container">
            <div className="row ">
                <div className="col-12 col-md-6 d-flex justify-content-center" style={{ padding: "50px" }}>
                    <ReactCardFlip isFlipped={dateFlipped} flipDirection="vertical">
                        <Card style={{ "paddingLeft": "0px", "paddingRight": "0px" }}>
                            <Card.Img variant="top" src="/assets/images/date.gif" height="350" />
                            <Card.Body>
                                <Card.Title>Reserve a Date</Card.Title>
                                <Card.Subtitle>Reserved Date: {(reservedDate) ? <Badge bg="warning" text="dark">{reservedDate}</Badge> : <Badge bg="secondary">No Reservation</Badge>}</Card.Subtitle>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                                <Button onClick={flipDate}>Click to Reserve a Date</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ "paddingLeft": "0px", "paddingRight": "0px" }}>
                            <Card.Img variant="top" src="/assets/images/date.gif" height="350" />
                            <Card.Body>
                                <Card.Title>Select a Date</Card.Title>
                                <DateReservationComponent />
                                <br></br>
                                <Button onClick={flipDate}>Click to Cancel</Button>
                            </Card.Body>
                        </Card>
                    </ReactCardFlip>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center" style={{ padding: "50px" }}>
                    <ReactCardFlip isFlipped={subFlipped} flipDirection="vertical">
                        <Card style={{ "paddingLeft": "0px", "paddingRight": "0px" }}>
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
                        <Card>
                            <Card.Img variant="top" src="/assets/images/fileSub.gif" height="350" />
                            <Card.Body>
                                <Card.Title>Upload Documents to Register your new Vehicle</Card.Title>
                                <UploadComponent />
                                <br></br>
                                <Button onClick={flipSub}>Click to flip</Button>
                            </Card.Body>
                        </Card>
                    </ReactCardFlip>
                </div>


            </div>

        </div>
    )

}

export default RegisterNewVehicle