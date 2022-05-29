import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import ViewVehicleComponent from './ViewVehicleComponent';


const OwnVehiclesComponent = () => {

    const [id, setId] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultVehicle, setDefaultVehicle] = useState("/assets/images/vehicle.jpg");
    const [ownVehicles, setOwnVehicles] = useState(
        [
            {
                id: 1,
                regNo: "XXX-XXXX",
                ownerName: "Full Name A",
                ownerNIC: "1999xxxxxV",
                registeredDate: "01/01/2000",
                type: "Mortor Car",
                model: "Range Rover",
                color: "color",
                weight: "100",
                doors: "4",
                manufacturedYear: "1999",
                image: "/assets/images/RR.jpg",
            },
            {
                id: 2,
                regNo: "XXX-XXXX",
                ownerName: "Full Name B",
                ownerNIC: "1999xxxxxV",
                registeredDate: "01/01/2000",
                type: "Mortor Car",
                model: "Range Rover",
                color: "color",
                weight: "100",
                doors: "4",
                manufacturedYear: "1999",
                image: "",
            },
            {
                id: 3,
                regNo: "XXX-XXXX",
                ownerName: "Full Name",
                ownerNIC: "1999xxxxxV",
                registeredDate: "01/01/2000",
                type: "Mortor Car",
                model: "Range Rover",
                color: "color",
                weight: "100",
                doors: "4",
                manufacturedYear: "1999",
                image: "",
            }, {
                id: 4,
                regNo: "XXX-XXXX",
                ownerName: "Full Name",
                ownerNIC: "1999xxxxxV",
                registeredDate: "01/01/2000",
                type: "Mortor Car",
                model: "Range Rover",
                color: "color",
                weight: "100",
                doors: "4",
                manufacturedYear: "1999",
                image: "",
            },
            {
                id: 5,
                regNo: "XXX-XXXX",
                ownerName: "Full Name",
                ownerNIC: "1999xxxxxV",
                registeredDate: "01/01/2000",
                type: "Mortor Car",
                model: "Range Rover",
                color: "color",
                weight: "100",
                doors: "4",
                manufacturedYear: "1999",
                image: "",
            },
            {
                id: 6,
                regNo: "XXX-XXXX",
                ownerName: "Full Name",
                ownerNIC: "1999xxxxxV",
                registeredDate: "01/01/2000",
                type: "Mortor Car",
                model: "Range Rover",
                color: "color",
                weight: "100",
                doors: "4",
                manufacturedYear: "1999",
                image: "",
            },
            {
                id: 7,
                regNo: "XXX-XXXX",
                ownerName: "Full Name",
                ownerNIC: "1999xxxxxV",
                registeredDate: "01/01/2000",
                type: "Mortor Car",
                model: "Range Rover",
                color: "color",
                weight: "100",
                doors: "4",
                manufacturedYear: "1999",
                image: "",
            },
            {
                id: 8,
                regNo: "XXX-XXXX",
                ownerName: "Full Name",
                ownerNIC: "1999xxxxxV",
                registeredDate: "01/01/2000",
                type: "Mortor Car",
                model: "Range Rover",
                color: "color",
                weight: "100",
                doors: "4",
                manufacturedYear: "1999",
                image: "",
            },
            {
                id: 9,
                regNo: "XXX-XXXX",
                ownerName: "Full Name",
                ownerNIC: "1999xxxxxV",
                registeredDate: "01/01/2000",
                type: "Mortor Car",
                model: "Range Rover",
                color: "color",
                weight: "100",
                doors: "4",
                manufacturedYear: "1999",
                image: "",
            }
        ]
    );

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const viewDetails = (Id) => {
        toggleModal();
        if (!isModalOpen) {
            setId(Id);
            // setVehicle(ownVehicles.filter(function (el) {
            //     return el.id === id;
            // })[0]);
            // setVehicle(ownVehicles.filter(obj => {
            //     return obj.id === id
            //   }));
        };
    }

    var vehicle = ownVehicles.filter(function (el) {
        return el.id === id;
    })[0];

    return (
        <div className='container'>
            <div className='row'>

                {ownVehicles.map((vehicle) => (

                    <Card key={vehicle.id} bg="light" border="light" className='m-3 shadow' style={{ width: '18rem', "paddingLeft": "0px", "paddingRight": "0px" }}>
                        <Card.Img variant="top" src={(vehicle.image) ? vehicle.image : defaultVehicle} />
                        <Card.Body>
                            <Card.Title>{vehicle.regNo}</Card.Title>
                            <Card.Subtitle>{vehicle.type} ({vehicle.model})</Card.Subtitle>
                            <Card.Text>Manufactured Year : {vehicle.manufacturedYear}</Card.Text>
                            <Button variant="outline-secondary" onClick={() => viewDetails(vehicle.id)}>Vehicle Details</Button>

                        </Card.Body>
                    </Card>
                ))}

            </div>

            <Modal show={isModalOpen} onHide={toggleModal}>
                <ViewVehicleComponent vehicle={vehicle} />
            </Modal>
        </div>

    )

}

export default OwnVehiclesComponent