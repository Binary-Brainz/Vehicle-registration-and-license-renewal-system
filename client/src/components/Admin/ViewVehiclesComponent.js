import { Button } from 'primereact/button';
import React from 'react';
import { Card } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';

//##add token check to server request

const ViewVehicles = () => {

    const token = sessionStorage.getItem('token');

    if (!token) {
        sessionStorage.clear();
        document.location = '/';
    }

    return (

        <div className='container'>
            <div className='row'>
                <div className='col d-flex justify-content-center' style={{padding: "30px"}}>
                    <Card className='shadow-lg' >
                        
                        <Card.Img src="/assets/images/car.gif"></Card.Img>
                        <Card.ImgOverlay style={{backdropFilter: "blur(1px)"}}>
                        <Card.Body className='text-white p-5'>Search Vehicles
                            <div className="p-inputgroup">
                                <Button label="Search"/>
                                <InputText placeholder="Enter Vehicle No(XXX-XXXX)"/>
                            </div>
                            
                            </Card.Body>
                        </Card.ImgOverlay>
                    </Card>
                </div>
            </div>
        </div>
    );

}


export default ViewVehicles;