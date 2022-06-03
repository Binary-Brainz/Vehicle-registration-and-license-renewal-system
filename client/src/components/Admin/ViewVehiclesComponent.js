import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { Card, Form, Modal, Nav, NavLink } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { Control, LocalForm } from 'react-redux-form';
import { Input } from 'reactstrap';
import { useForm } from 'react-hook-form';
import VehicleComponent from './VehicleDetailsComponent';

const axios = require('axios').default;

const ViewVehicles = () => {

    const token = sessionStorage.getItem('officer_token');

    if (!token) {
        sessionStorage.clear();
        document.location = '/';
    }

    const { register, formState: { errors } } = useForm();

    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [no, setNo] = useState(false);

    const showResults = (event) => {
        if(no){
            setNo(false);
        }
        
        let key = (event.target.value).toUpperCase();
        setSearch(key);
        let veh = vehicles.filter((vehicle) => key && vehicle.vehicle.regNo.includes(key));
        setFilteredVehicles(veh);
    }
    const submitResult = () => {
        let veh = vehicles.filter((vehicle) => search && vehicle.vehicle.regNo.includes(search));
        setFilteredVehicles(veh);
        if(filteredVehicles.length == 0){
            setNo(true);
        }
    }

    const selectVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        toggleModal();
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    useEffect(() => {

        axios.get(`/officer/allVehicles`, {
            headers: {
                'Content-Type': 'application/json',
                token: token,
            }
        })
            .then(response => {

                let status = response.data.status;

                if (status === 'ok') {
                    setVehicles(response.data.result);
                }
                else if (status === 'auth-error') {
                    sessionStorage.clear();
                    document.location = '/';
                }
                else {
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
                <div className='col d-flex justify-content-center' style={{ padding: "30px" }}>
                    <Card className='shadow-lg' >

                        <Card.Img src="/assets/images/car.gif"></Card.Img>
                        <Card.ImgOverlay style={{ backdropFilter: "blur(1px)" }}>

                            <Card.Body className='text-white p-5'>
                                <Card.Title>Search Vehicles</Card.Title>

                                
                                    <div className="p-inputgroup">
                                        <Button onClick={submitResult} label="Search" />
                                        <InputText onChange={showResults} name="val" placeholder="Enter Vehicle No(XX-XXX-XXXX)" />
                                    </div>

                                

                                {((filteredVehicles.length > 0) && !no) && 
                                <Card bg='light'>
                                    <Card.Body className='text-black'>
                                        {filteredVehicles.map((vehicle) => <NavLink key={vehicle.vehicle.id} onClick={()=>selectVehicle(vehicle.vehicle)}><span className='fa fa-user'></span> {vehicle.owner.firstName} {vehicle.owner.lastName}  : <span className='fa fa-car'></span> {vehicle.vehicle.regNo}</NavLink>)}
                                    </Card.Body>
                                </Card>
                                }{((filteredVehicles.length == 0) && no) &&
                                <Card body bg='light'>
                                    <Card.Title className='text-black'>No Such Vehicle</Card.Title>
                                </Card>}
                            </Card.Body>
                        </Card.ImgOverlay>
                    </Card>
                </div>
            </div>
            <Modal show={isModalOpen} onHide={toggleModal}>
                <Modal.Header closeButton><Modal.Title>Vehicle Details</Modal.Title></Modal.Header>
                <Modal.Body>
                    <VehicleComponent vehicle={selectedVehicle} register={register} errors={errors} disabled={1} />
                </Modal.Body>
            </Modal>
        </div>
    );

}


export default ViewVehicles;