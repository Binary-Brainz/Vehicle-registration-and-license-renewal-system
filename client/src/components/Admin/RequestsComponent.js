import { Badge, Button, Card } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import React, { useState } from "react";

function RenderCard(props) {
    if (props.cond) {
        return (
            <div className="col-12 d-flex justify-content-center" style={{ padding: "50px" }}>
                <ReactCardFlip isFlipped={props.cond} flipDirection="vertical">
                    <Card>
                    </Card>
                    <Card onClick={props.meth} as="button" className="shadow-lg text-center" style={{ "paddingLeft": "0px", "paddingRight": "0px" }}>
                        <Card.Body >
                        <Card.Img variant="top" src={props.img} />
                        <Card.Title>New Requests</Card.Title>
                        </Card.Body>
                    </Card>
                </ReactCardFlip>
            </div>
        );
    }else{
        return (
            <div className="col-12 col-md-4 d-flex justify-content-center" style={{ padding: "50px" }}>
                <ReactCardFlip isFlipped={props.cond} flipDirection="vertical">
                    <Card onClick={props.meth} as="button" className="shadow-lg text-center" style={{ "paddingLeft": "0px", "paddingRight": "0px" }}>

                        <Card.Body >
                            <Card.Img variant="top" src={props.img} />
                            <Card.Title>View New Requests</Card.Title>
                            <Card.Text></Card.Text>
                            <Card.Title><Badge bg={props.col}>{props.state}</Badge></Card.Title>

                        </Card.Body>
                    </Card>
                    <Card></Card>
                </ReactCardFlip>
            </div>
        );
    }
}

export default function Requests() {
    const type = '';

    const [newFlipped, setNewFlipped] = useState(false);
    const flipNew = () => setNewFlipped(!newFlipped);

    const [approvedFlipped, setApprovedFlipped] = useState(false);
    const flipApproved = () => setApprovedFlipped(!approvedFlipped);

    const [rejectedFlipped, setRejectedFlipped] = useState(false);
    const flipRejected = () => setRejectedFlipped(!rejectedFlipped);


    return (
        <div className="container">
            <h2>Requests({type})</h2><br />
            <div className="row">
                <RenderCard cond={newFlipped} meth={flipNew} img={"/assets/images/new.png"} col={"primary"} state={"NEW"} />
                <RenderCard cond={approvedFlipped} meth={flipApproved} img={"/assets/images/approved.jpg"} col={"success"} state={"APPROVED"} />
                <RenderCard cond={rejectedFlipped} meth={flipRejected} img={"/assets/images/rejected.jpg"} col={"danger"} state={"REJECTED"} />

            </div><br />

        </div>
    );
}