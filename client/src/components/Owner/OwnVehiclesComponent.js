import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import ViewVehicleComponent from './ViewVehicleComponent';
import { useSelector, useDispatch } from 'react-redux';
import ReactCrop from 'react-image-crop';
import { gotId, gotNic } from '../userSlice';
import { FileUpload } from 'primereact/fileupload';

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

    useEffect(() => {

        axios.get(`http://localhost:5000/owner/dashboard/${user_id}`, {
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

    const [srcImg, setSrcImg] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [result, setResult] = useState(null);

    const handleImage = async (event) => {
        setSrcImg(URL.createObjectURL(event.target.files[0]));
        console.log(event.target.files[0]);
    };

    const getCroppedImg = async () => {
        try {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const base64Image = canvas.toDataURL("image/jpeg", 1);
            setResult(base64Image);
            console.log(result);
        } catch (e) {
            console.log("crop the image");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(result);
    }

    const onUpload = () => {

        console.log("done")
    }

    var vehicle = ownVehicles.filter(function (el) {
        return el._id === id;
    })[0];

    return (
        <div className='container'>
            <div className='row'>

                {ownVehicles.map((vehicle) => (

                    <Card key={vehicle._id} bg="light" border="light" className='m-3 shadow' style={{ height: "24rem", width: '18rem', "paddingLeft": "0px", "paddingRight": "0px" }}>
                        <Card.Img height="200rem" className='crdhv' onMouseOut={() => setVId("")} onMouseOver={() => setVId(vehicle._id)} onClick={changeImage} variant="top" src={(vehicle.image) ? vehicle.image : ((vId === vehicle._id) ? "/assets/images/edit.jpg" : defaultVehicle)} />
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
                    <FileUpload name="demo[]" url="https://binary-brainz-bucket.s3.us-west-2.amazonaws.com/uploads" onUpload={onUpload} accept="image/*" maxFileSize={1000000}
                        emptyTemplate={<p className="m-0">Drag and drop image to here to upload.</p>} />
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