import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { Form, Input } from 'reactstrap';



export default class RenewLicense extends React.Component {
    constructor() {
        super()

        this.state = {
            id: 0,
            isModalOpen: false,
            defaultVehicle: "/assets/images/vehicle.jpg",
            ownVehicles: [
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
            ]

        }
        this.toggleModal = this.toggleModal.bind(this);
        this.viewDetails = this.viewDetails.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    viewDetails(Id) {
        this.setState(this.toggleModal);
        if(this.state.isModalOpen === false){
            this.setState(
                {id: Id}
            )
        };    
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>

                    {this.state.ownVehicles.filter((veh) => veh.licenseExp).map((vehicle) => (

                        <Card key={vehicle.id} bg="light" border="light" className='m-3 shadow' style={{ width: '18rem', "paddingLeft": "0px", "paddingRight": "0px" }}>
                            <Card.Img variant="top" src={(vehicle.image)?vehicle.image: this.state.defaultVehicle} />
                            <Card.Body>
                                <Card.Title>{vehicle.vehicleNo}</Card.Title>
                                <Card.Subtitle>{vehicle.vehicleType} ({vehicle.vehicleModel})</Card.Subtitle>
                                <Card.Text>Manufactured Year : {vehicle.manufacturedYear}</Card.Text>
                                <Button variant="outline-secondary" onClick={()=>this.viewDetails(vehicle.id)}>Vehicle Details</Button>
                                
                            </Card.Body>
                        
                        </Card>

                    ))}

                </div>
                <Modal show={this.state.isModalOpen} onHide={this.toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.toggleModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        )
    }
}