import { Badge, Card, Table } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import React, { useState } from "react";
import DataTable from "./DataTableComponent";
import { titleCase } from "title-case";
import { Button } from 'primereact/button';

function RenderCard(props) {
    
    if (props.cond) {
        return (
            <div className="col-12 d-flex justify-content-center order-first" style={{ padding: "50px" }}>
                <ReactCardFlip isFlipped={props.cond} flipDirection="vertical">
                    <Card>
                    </Card>
                    <Card bg="light" className="shadow-lg " style={{ "paddingLeft": "0px", "paddingRight": "0px", width: '75vw' }} >
                        <Card.Header >
                        <div className="text-end"><Button onClick={props.meth} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text " aria-label="Cancel" /></div>
                            <Card.Title>{titleCase(props.state)} Requests </Card.Title>
                            
                        </Card.Header>
                        <Card.Body >
                            <DataTable state={props.state}/>
                        </Card.Body>
                    </Card>
                </ReactCardFlip>
            </div>
        );
    } else {
        return (
            <div className="col-12 col-md-4 d-flex justify-content-center" style={{ padding: "50px" }}>
                <ReactCardFlip isFlipped={props.cond} flipDirection="vertical">
                    <Card onClick={props.meth} as="button" className="shadow-lg text-center" style={{ "paddingLeft": "0px", "paddingRight": "0px" }}>

                        <Card.Body >
                            <Card.Img variant="top" src={props.img} />
                            <Card.Title>View New Requests</Card.Title>
                            <Card.Text></Card.Text>
                            <Card.Title><Badge bg={props.col}>{(props.state).toUpperCase()}</Badge></Card.Title>

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
            <h2>Requests({type})</h2>
            <div className="row align-items-center">
                <RenderCard cond={newFlipped} meth={flipNew} img={"/assets/images/new.jpg"} col={"primary"} state={"pending"} />
                <RenderCard cond={approvedFlipped} meth={flipApproved} img={"/assets/images/approved.jpg"} col={"success"} state={"approved"} />
                <RenderCard cond={rejectedFlipped} meth={flipRejected} img={"/assets/images/rejected.jpg"} col={"danger"} state={"rejected"} />

            </div>

        </div>
    );
}