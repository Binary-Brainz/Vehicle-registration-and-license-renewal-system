
import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ProductService } from '../service/ProductService';
import '../../styles/DataTable.css';
import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';
import { Modal, Collapse } from 'react-bootstrap';
import NewVehicle from './NewVehicleComponent';
import UpdateVehicle from './UpdateVehicleComponent';
import LicenseRenewalOfficer from './LicenseRenewalComponent';
import RequestRejection from './RequestRejectionComponent';

const axios = require('axios').default;

const DataTable = (props) => {

    const user_id = useSelector(state => state.user.id);

    const [products, setProducts] = useState(null);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [name, setname] = useState('');
    const [requests, setRequests] = useState([]);

    const [openRegistration, setOpenRegistration] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openRenewal, setOpenRenewal] = useState(false);
    const [openRejection, setOpenRejection] = useState(false);

    const productService = new ProductService();
    useEffect(() => {

        // console.log(productService.getProductsWithOrdersSmall());
        // productService.getProductsWithOrdersSmall().then(data => setProducts(data));

        async function fetchData() {

            try {

                const token = sessionStorage.getItem('token');

                let response = await axios.get(`http://localhost:5000/officer/dashboard/${user_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                        state: props.state
                    }
                });

                let status = response.data.status;
                let returned_requests = response.data.requests;

                if (status === 'ok') {
                    setRequests(returned_requests);
                }
                else {
                    console.log(response.error);
                }
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchData();
    }, []);



    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive
    }
    const onClick = (type, name) => {
        dialogFuncMap[`${type}`](true);
        setname(name);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }


    const renderListItem = (request) => {
        return (
            <div className="col-12 shadow">
                <div className="product-list-item">
                    <div className="product-list-detail">
                        <div className="product-name">{request.ownerName}</div>
                        <div className="product-description">{request.regNo}</div>

                    </div>
                    <div className="product-list-action">
                        <Button label="Show" icon="pi pi-external-link" onClick={() => onClick('displayResponsive', request.ownerName)} className="p-button-info p-button-sm p-button-rounded" />
                        <div className="product-badge">{request.createdAt}</div>
                    </div>
                </div>

            </div>

        );
    }


    const itemTemplate = (request) => {
        if (!request) {
            return;
        }
        return renderListItem(request);

    }

    const renderCollapsible = () => {
        switch (props.type) {
            case "Vehicle Registration":
                setOpenRegistration(!openRegistration);
                break;
            case "Update Vehicle":
                setOpenUpdate(!openUpdate);
                break;
            case "Renew License":
                setOpenRenewal(!openRenewal);
                break;
        }
        setOpenRejection(false);
    }

    const renderRejection = () => {
        setOpenRejection(!openRejection);
        setOpenRegistration(false);
        setOpenUpdate(false);
        setOpenRenewal(false);
    }

    return (

        <div className="dataview-demo">
            <div className="card">
                <DataView value={requests} itemTemplate={itemTemplate} paginator rows={5} />
            </div>
            <Dialog header={name} visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} >
                <Card>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <div>
                            <p> Files submitted by Vehicle Owner:</p>
                            <a href="" download>
                                Click to download
                            </a>
                        </div>

                        <br></br>
                        <div >
                            <Button className="btn mr-1" onClick={renderCollapsible}>
                                Approve
                            </Button>
                            <Button className='btn btn-primary margin-left float-right' onClick={renderRejection}>
                                Reject
                            </Button>
                        </div>

                        <Collapse in={openRegistration}>
                            <div >
                                <Modal.Header>
                                    <Modal.Title>Register New Vehicle</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <NewVehicle />
                                </Modal.Body>
                            </div>
                        </Collapse>

                        <Collapse in={openUpdate}>
                            <div >
                                <Modal.Header>
                                    <Modal.Title>Update Vehicle Details</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <UpdateVehicle />
                                </Modal.Body>
                            </div>
                        </Collapse>

                        <Collapse in={openRenewal}>
                            <div >
                                <Modal.Header>
                                    <Modal.Title>Renew Vehicle License</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <LicenseRenewalOfficer />
                                </Modal.Body>
                            </div>
                        </Collapse>

                        <Collapse in={openRejection}>
                            <div >
                                <Modal.Header>
                                    <Modal.Title>Reject Request</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <RequestRejection />
                                </Modal.Body>
                            </div>
                        </Collapse>
                    </Card.Body>
                </Card>
            </Dialog>
        </div>
    );
}

export default DataTable;