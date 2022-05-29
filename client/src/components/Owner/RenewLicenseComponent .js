import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { Form, Input } from 'reactstrap';
import RenewalComponent from './RenewalComponent';


function RenewLicense(props) {

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

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const viewDetails = (Id) => {
        toggleModal();
        if(!isModalOpen){
            setId(id);
        };    
    }

    return (
        <div className='container'>
            <div className='row'>

                {ownVehicles.filter((veh) => veh.licenseExp).map((vehicle) => (

                    <Card key={vehicle.id} bg="light" border="light" className='m-3 shadow' style={{ width: '18rem', "paddingLeft": "0px", "paddingRight": "0px" }}>
                        <Card.Img variant="top" src={(vehicle.image)?vehicle.image: defaultVehicle} />
                        <Card.Body>
                            <Card.Title>{vehicle.vehicleNo}</Card.Title>
                            <Card.Subtitle>{vehicle.vehicleType} ({vehicle.vehicleModel})</Card.Subtitle>
                            <Card.Text>Manufactured Year : {vehicle.manufacturedYear}</Card.Text>
                            <Button variant="outline-secondary" onClick={()=>viewDetails(vehicle.id)}>Vehicle Details</Button>
                            
                        </Card.Body>
                    
                    </Card>

                ))}

            </div>
            <Modal show={isModalOpen} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Renew License for Vehicle {id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RenewalComponent/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}

export default RenewLicense;