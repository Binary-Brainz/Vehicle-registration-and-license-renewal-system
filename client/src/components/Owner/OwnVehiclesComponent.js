import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import ViewVehicleComponent from './ViewVehicleComponent';
import { useSelector, useDispatch } from 'react-redux';
import ReactCrop from 'react-image-crop';
import { gotId, gotNic } from '../userSlice';
import { FileUpload } from 'primereact/fileupload';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

const axios = require('axios').default;

const OwnVehicles = () => {

    const token = sessionStorage.getItem('owner_token');

    if (!token) {
        sessionStorage.clear();
        document.location = '/';
    }

    const storageUserData = JSON.parse(sessionStorage.getItem("userData"));
    const stored_id = useSelector(state => state.user.id);
    const user_id = storageUserData.id;

    const [user, setUser] = useState({});
    const [id, setId] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultVehicle, setDefaultVehicle] = useState("/assets/images/vehicle2.gif");
    const [ownVehicles, setOwnVehicles] = useState([]);
    const [vId, setVId] = useState("");
    const [vNo, setVNo] = useState("");

    const setVid = (no) => {
        setVId(no);
        setVNo(no);
    }

    useEffect(() => {

        axios.get(`/owner/dashboard/${user_id}`, {
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
                else if (status === 'auth-error') {
                    sessionStorage.clear();
                    document.location = '/';
                }
                else {
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
        if (!isModalOpen) {
            setId(Id);
        };
    }

    const [isImageModal, setIsImageModal] = useState(false);

    const toggleImageModal = () => setIsImageModal(!isImageModal);
    const changeImage = () => {
        toggleImageModal();
    }

    const [result, setResult] = useState(null);
    const navigate = useNavigate();

   
    const onSubmit = async (data) => {

        
        const formData = new FormData();
        console.log(vNo);
        formData.append("regNo", vNo);

        for(let i =0; i < data.file.length; i++) {
                formData.append("documents", data.file[i]);
        }

        let response = await fetch("/owner/vehicleImg", {
            method: 'POST',
            body: formData,
        })

        let returned_data = await response.json();
        if(returned_data.status === "ok"){
            navigate(0);
        }else{
            console.log(returned_data)
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    var vehicle = ownVehicles.filter(function (el) {
        return el._id === id;
    })[0];

    return (
        <div className='container'>
            <div className='row'>

                {ownVehicles.map((vehicle) => (

                    <Card key={vehicle._id} bg="light" border="light" className='m-3 shadow' style={{ height: "24rem", width: '18rem', "paddingLeft": "0px", "paddingRight": "0px" }}>
                        <Card.Img height="200rem" onMouseOut={() => setVId("")} onMouseOver={() => setVid(vehicle.regNo)} onClick={changeImage} variant="top" src={(vehicle.img) ? ((vId === vehicle.regNo) ? "/assets/images/edit.jpg" : vehicle.img) : ((vId === vehicle.regNo) ? "/assets/images/edit.jpg" : defaultVehicle)} />
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
                <ViewVehicleComponent vehicle={vehicle} />
            </Modal>

            <Modal show={isImageModal} onHide={toggleImageModal}>
                <Modal.Header closeButton>Change Image</Modal.Header>
                <Modal.Body >
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Document</Form.Label>
                            <Form.Control type="file" name='file' {...register("file", {
                                required: true
                            })} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Upload
                        </Button>
                    </Form>
                    <div>
                        {result && (
                            <div>
                                <img src={result} alt="cropped image" />
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </div>

    )

}

export default OwnVehicles