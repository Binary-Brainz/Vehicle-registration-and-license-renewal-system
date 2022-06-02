import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { Form, Input } from 'reactstrap';
import RenewalComponent from './RenewalComponent';
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';
import { Toast } from 'primereact/toast';

const axios = require('axios').default;

function RenewLicense(props) {

    const token = sessionStorage.getItem('owner_token');

    if(!token){
        sessionStorage.clear();
        document.location = '/';
    }

    const storageUserData = JSON.parse(sessionStorage.getItem("userData"));
    const stored_id = useSelector(state => state.user.id);
    const user_id = (stored_id !== '') ? stored_id : storageUserData.id;

    const [user, setUser] = useState({});
    const [id, setId] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultVehicle, setDefaultVehicle] = useState("/assets/images/vehicle.gif");
    const [ownVehicles, setOwnVehicles] = useState([]);
    const toast = useRef(null);

    useEffect(() => {

        axios.get(`http://localhost:5000/owner/expiredVehicles/${user_id}`, {
            headers: {
                'Content-Type': 'application/json',
                token: token,
            }
        })
            .then(response => {

                let status = response.data.status;
                let vehicles = response.data.vehicles;
                let user_data = response.data.user;

                if (status === 'ok') {
                    setOwnVehicles(vehicles);
                    setUser(user_data);
                }
                else if(status === 'auth-error'){
                    sessionStorage.clear();
                    document.location = '/';
                }
                else {
                    console.log(response.error);
                    toast.current.show({ severity: 'error', summary: `${response.error}`, life: 5000 });

                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const viewDetails = (Id) => {
        toggleModal();
        if (isModalOpen === false) {
            setId(Id);
        };
    }

    return (
        <div>
            <Toast ref={toast} position="top-center" />
            <div className='container'>
                <div className='row'>

                    {ownVehicles.map((vehicle) => (

                        <Card key={vehicle._id} bg="light" border="light" className='m-3 shadow' style={{ width: '18rem', "paddingLeft": "0px", "paddingRight": "0px" }}>
                            <Card.Img variant="top" src={(vehicle.image) ? vehicle.image : defaultVehicle} />
                            <Card.Body>
                                <Card.Title>{vehicle.regNo}</Card.Title>
                                <Card.Subtitle>{vehicle.type} ({vehicle.model})</Card.Subtitle>
                                <Card.Text>Manufactured Year : {vehicle.manufacturedYear}</Card.Text>
                                <Button variant="outline-secondary" onClick={() => viewDetails(vehicle._id)}>Vehicle Details</Button>

                            </Card.Body>

                        </Card>

                    ))}

                </div>
                <Modal show={isModalOpen} onHide={toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Renew License for Vehicle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {ownVehicles.filter(vehicle => vehicle._id === id).map(vehicle => (
                            <RenewalComponent regNo={vehicle.regNo} nextYearFee={vehicle.nextYearFee}/>
                        ))}

                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default RenewLicense;