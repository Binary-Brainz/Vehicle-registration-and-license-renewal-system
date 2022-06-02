
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
import { Badge } from 'primereact/badge';

const axios = require('axios').default;

const DataTable = (props) => {

    const storageUserData = JSON.parse(sessionStorage.getItem("userData"));
    const user_id = storageUserData.id;

    const [products, setProducts] = useState(null);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [name, setname] = useState('');
    const [regNo, setRegNo] = useState('');
    const [reqId, setReqId] = useState('');
    const [ownerID, setOwnerId] = useState('');
    const [requests, setRequests] = useState([]);
    const [vehicle, setVehicle] = useState({});

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

                const token = sessionStorage.getItem('officer_token');

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
                    console.log(response.data.error);
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
    const onClick = (type, name, regNo, reqId, ownerID, vehicle) => {
        dialogFuncMap[`${type}`](true);
        setname(name);
        setRegNo(regNo);
        setReqId(reqId);
        setOwnerId(ownerID);
        setVehicle(vehicle);
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
                        <Button label="Show" icon="pi pi-external-link" onClick={() => onClick('displayResponsive', request.ownerName, request.regNo, request._id, request.ownerID, request.vehicle)} className="p-button-info p-button-sm p-button-rounded" />
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
        switch (storageUserData.officerType) {
            case "Vehicle Registration":
                setOpenRegistration(!openRegistration);
                break;
            case "Update Vehicle":
                setOpenUpdate(!openUpdate);
                break;
            case "License Renewal":
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
                        {(regNo) && <Card.Title>Vehicle No : <Badge value={regNo} severity="success" className="m-2 fs-5"></Badge></Card.Title>}
                        <Card className='text-center text-lg bg-light fs-4'>
                            Attached File<br />
                            <Card.Link href={`http://localhost:5000/officer/downloadDocumets/${reqId}`} className='product-name' ><span className='fa fa-download'></span></Card.Link>
                        </Card>

                        <br></br>
                        <div >
                            <span className="p-buttonset">
                            {(props.state === "pending") && <Button label='Approve' icon="pi pi-check" className="p-button-sm p-button-raised p-button-success" onClick={renderCollapsible} />}
                            {(props.state === "pending") && <Button label='Reject' icon="pi pi-times" className="p-button-sm p-button-raised p-button-danger" onClick={renderRejection} />}
                            </span>
                            
                            
                        </div>

                        <Collapse in={openRegistration}>
                            <div >
                                <Modal.Header>
                                    <Modal.Title>Register New Vehicle</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <NewVehicle ownerID={ownerID} reqId={reqId} />
                                </Modal.Body>
                            </div>
                        </Collapse>

                        <Collapse in={openUpdate}>
                            <div >
                                <Modal.Header>
                                    <Modal.Title>Update Vehicle Details</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <UpdateVehicle ownerID={ownerID} reqId={reqId} regNo={regNo} vehicle={vehicle} />
                                </Modal.Body>
                            </div>
                        </Collapse>

                        <Collapse in={openRenewal}>
                            <div >
                                <Modal.Header>
                                    <Modal.Title>Renew Vehicle License</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <LicenseRenewalOfficer ownerID={ownerID} reqId={reqId} regNo={regNo} vehicle={vehicle} />
                                </Modal.Body>
                            </div>
                        </Collapse>

                        <Collapse in={openRejection}>
                            <div >
                                <Modal.Header>
                                    <Modal.Title>Reject Request</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <RequestRejection reqId={reqId} />
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