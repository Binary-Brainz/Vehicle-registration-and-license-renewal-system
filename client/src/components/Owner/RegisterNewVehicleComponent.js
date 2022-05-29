import React, { Component } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import ReactCardFlip from 'react-card-flip';



export default class RegisterNewVehicle extends Component {
    constructor() {
        super();
        this.state = {
            dateFlipped: false,
            subFlipped: false,
            reservedDate: "",
            subStatus: false
        };
        this.flipDate = this.flipDate.bind(this);
        this.flipSub = this.flipSub.bind(this);
    }

    flipDate(e) {
        this.setState(prevState => ({ dateFlipped: !prevState.dateFlipped }));
    }

    flipSub(e) {
        this.setState(prevState => ({ subFlipped: !prevState.subFlipped }));
    }

    render() {
        return (
            <div className="container">
                <div className="row ">
                    <div className="col-12 col-md-6 d-flex justify-content-center" style={{paddingLeft: "30px", paddingRight: "30px"}}>
                        <ReactCardFlip isFlipped={this.state.dateFlipped} flipDirection="vertical">
                            <Card style={{  "paddingLeft": "0px", "paddingRight": "0px"  }}>
                                <Card.Img variant="top" src="assets/images/date.gif" height="350" />
                                <Card.Body>
                                    <Card.Title>Reserve a Date</Card.Title>
                                    <Card.Subtitle>Reserved Date: {(this.state.reservedDate)? <Badge bg="warning" text="dark">{this.state.reservedDate}</Badge>: <Badge bg="secondary">No Reservation</Badge>}</Card.Subtitle>
                                    <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                    </Card.Text>
                                    <Button onClick={this.flipDate}>Click to Reserve a Date</Button>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src="" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        
                                    </Card.Text>
                                    <Button onClick={this.flipDate}>Click to flip</Button>
                                </Card.Body>
                            </Card>
                        </ReactCardFlip>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center" style={{paddingLeft: "30px", paddingRight: "30px"}}>
                        <ReactCardFlip isFlipped={this.state.subFlipped} flipDirection="vertical">
                            <Card style={{  "paddingLeft": "0px", "paddingRight": "0px" }}>
                                <Card.Img variant="top" src="assets/images/fileSub.gif" height="350" />
                                <Card.Body>
                                    <Card.Title>Submit Vehicle Details Form</Card.Title>
                                    <Card.Subtitle>{(this.state.subStatus)? <Badge bg="warning" text="dark">Submited</Badge>: <Badge bg="secondary">No Submission</Badge>}</Card.Subtitle>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                    </Card.Text>
                                    <Button onClick={this.flipSub}>Click to Submit Form</Button>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src="" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                    </Card.Text>
                                    <Button onClick={this.flipSub}>Click to flip</Button>
                                </Card.Body>
                            </Card>
                        </ReactCardFlip>
                    </div>


                </div>

            </div>
        )
    }
}