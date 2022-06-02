import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';

const axios = require('axios').default;

const ViewVehicles = () => {

    const token = sessionStorage.getItem('officer_token');

    if (!token) {
        sessionStorage.clear();
        document.location = '/';
    }

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:5000/officer/allVehicles`, {
            headers: {
                'Content-Type': 'application/json',
                token: token,
            }
        })
            .then(response => {

                let status = response.data.status;

                if(status === 'ok'){
                    setVehicles(response.data.result);
                }
                else if(status === 'auth-error'){
                    sessionStorage.clear();
                    document.location = '/';
                }
                else{
                    console.log(response);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

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