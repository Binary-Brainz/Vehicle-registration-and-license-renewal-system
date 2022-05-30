import React, { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { Form, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';

const axios = require('axios').default;


function RenewLicense(props) {

    const user_id = useSelector(state => state.user.id);

    const [user, setUser] = useState({});
    const [id, setId] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultVehicle, setDefaultVehicle] = useState("/assets/images/vehicle.jpg");
    const [ownVehicles, setOwnVehicles] = useState([
        {
            id: 1,
            vehicleNo: "XXX-XXXX",
            ownerName: "Full Name",
            OwnerNic: "1999xxxxxV",
            registeredDate: "01/01/2000",
            vehicleType: "Mortor Car",
            vehicleModel: "Range Rover",
            vehicleColor: "color",
            vehicleWeight: "100",
            numberOfDoors: "4",
            manufacturedYear: "1999",
            image: "/assets/images/RR.jpg",
            licenseExp: true
        },
        {
            id: 2,
            vehicleNo: "XXX-XXXX",
            ownerName: "Full Name",
            OwnerNic: "1999xxxxxV",
            registeredDate: "01/01/2000",
            vehicleType: "Mortor Car",
            vehicleModel: "Range Rover",
            vehicleColor: "color",
            vehicleWeight: "100",
            numberOfDoors: "4",
            manufacturedYear: "1999",
            image: "",
            licenseExp: false
        },
        {
            id: 3,
            vehicleNo: "XXX-XXXX",
            ownerName: "Full Name",
            OwnerNic: "1999xxxxxV",
            registeredDate: "01/01/2000",
            vehicleType: "Mortor Car",
            vehicleModel: "Range Rover",
            vehicleColor: "color",
            vehicleWeight: "100",
            numberOfDoors: "4",
            manufacturedYear: "1999",
            image: "",
            licenseExp: true
        }, {
            id: 4,
            vehicleNo: "XXX-XXXX",
            ownerName: "Full Name",
            OwnerNic: "1999xxxxxV",
            registeredDate: "01/01/2000",
            vehicleType: "Mortor Car",
            vehicleModel: "Range Rover",
            vehicleColor: "color",
            vehicleWeight: "100",
            numberOfDoors: "4",
            manufacturedYear: "1999",
            image: "",
            licenseExp: false
        },
        {
            id: 5,
            vehicleNo: "XXX-XXXX",
            ownerName: "Full Name",
            OwnerNic: "1999xxxxxV",
            registeredDate: "01/01/2000",
            vehicleType: "Mortor Car",
            vehicleModel: "Range Rover",
            vehicleColor: "color",
            vehicleWeight: "100",
            numberOfDoors: "4",
            manufacturedYear: "1999",
            image: "",
            licenseExp: true
        },
        {
            id: 6,
            vehicleNo: "XXX-XXXX",
            ownerName: "Full Name",
            OwnerNic: "1999xxxxxV",
            registeredDate: "01/01/2000",
            vehicleType: "Mortor Car",
            vehicleModel: "Range Rover",
            vehicleColor: "color",
            vehicleWeight: "100",
            numberOfDoors: "4",
            manufacturedYear: "1999",
            image: "",
            licenseExp: false
        },
        {
            id: 7,
            vehicleNo: "XXX-XXXX",
            ownerName: "Full Name",
            OwnerNic: "1999xxxxxV",
            registeredDate: "01/01/2000",
            vehicleType: "Mortor Car",
            vehicleModel: "Range Rover",
            vehicleColor: "color",
            vehicleWeight: "100",
            numberOfDoors: "4",
            manufacturedYear: "1999",
            image: "",
            licenseExp: false
        },
        {
            id: 8,
            vehicleNo: "XXX-XXXX",
            ownerName: "Full Name",
            OwnerNic: "1999xxxxxV",
            registeredDate: "01/01/2000",
            vehicleType: "Mortor Car",
            vehicleModel: "Range Rover",
            vehicleColor: "color",
            vehicleWeight: "100",
            numberOfDoors: "4",
            manufacturedYear: "1999",
            image: "",
            licenseExp: false
        },
        {
            id: 9,
            vehicleNo: "XXX-XXXX",
            ownerName: "Full Name",
            OwnerNic: "1999xxxxxV",
            registeredDate: "01/01/2000",
            vehicleType: "Mortor Car",
            vehicleModel: "Range Rover",
            vehicleColor: "color",
            vehicleWeight: "100",
            numberOfDoors: "4",
            manufacturedYear: "1999",
            image: "",
            licenseExp: true
        },
    ]);

    useEffect(() => {

        const token = sessionStorage.getItem('token');

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

                if(status === 'ok'){
                    setOwnVehicles(vehicles);
                    setUser(user_data);
                }
                else{
                    console.log(response.error);
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
        if(isModalOpen === false){
            setId(Id);
        };    
    }

    return (
        <div className='container'>
            <div className='row'>

                {ownVehicles.map((vehicle) => (

                    <Card key={vehicle._id} bg="light" border="light" className='m-3 shadow' style={{ width: '18rem', "paddingLeft": "0px", "paddingRight": "0px" }}>
                        <Card.Img variant="top" src={(vehicle.image)?vehicle.image: defaultVehicle} />
                        <Card.Body>
                            <Card.Title>{vehicle.regNo}</Card.Title>
                            <Card.Subtitle>{vehicle.type} ({vehicle.model})</Card.Subtitle>
                            <Card.Text>Manufactured Year : {vehicle.manufacturedYear}</Card.Text>
                            <Button variant="outline-secondary" onClick={()=>viewDetails(vehicle._id)}>Vehicle Details</Button>
                            
                        </Card.Body>
                    
                    </Card>

                ))}

            </div>
            <Modal show={isModalOpen} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={toggleModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}

export default RenewLicense;